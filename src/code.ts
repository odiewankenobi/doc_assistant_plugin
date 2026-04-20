// ============================================================
// DS Doc Assistant — Main Thread (code.ts)
// Módulo 1: Generación automática de estructura de componente
// Source of truth de librería: Supabase (ScannLab_Component_Element_Library)
// ============================================================

// --------------- Tipos ------------------

interface LayerNode {
  name: string;
  type: string;
  children: LayerNode[];
}

interface LibraryRow {
  id: string;
  nombre_scannlab: string;
  layer_name_figma: string | null;
  categoria: string | null;
  nivel_atomico: string | null;
  definicion: string | null;
}

interface PluginMessage {
  type: 'generate-structure' | 'library-loaded' | 'close';
  rows?: LibraryRow[];
}

// --------------- Estado de librería -----
// Se carga desde la UI cuando Supabase responde.
// Fallback vacío hasta que llegue.
let supabaseLibrary: LibraryRow[] = [];

// --------------- Helpers ----------------

/**
 * Construye un árbol de LayerNode desde un nodo de Figma
 */
function buildLayerTree(node: SceneNode): LayerNode {
  const result: LayerNode = {
    name: node.name,
    type: node.type,
    children: [],
  };

  if ('children' in node && node.children) {
    for (const child of node.children) {
      result.children.push(buildLayerTree(child as SceneNode));
    }
  }

  return result;
}

/**
 * Busca un row en la librería de Supabase por layer_name_figma o nombre_scannlab
 * Estrategia: exact match primero, luego partial match.
 */
function findLibraryRow(layerName: string): LibraryRow | null {
  const normalized = layerName.toLowerCase().trim();

  // 1. Exact match contra layer_name_figma
  const exactFigma = supabaseLibrary.find(
    r => (r.layer_name_figma || '').toLowerCase() === normalized
  );
  if (exactFigma) return exactFigma;

  // 2. Exact match contra nombre_scannlab
  const exactName = supabaseLibrary.find(
    r => r.nombre_scannlab.toLowerCase() === normalized
  );
  if (exactName) return exactName;

  // 3. Partial match: el nombre de capa contiene la key, o la key contiene el nombre
  const partial = supabaseLibrary.find(r => {
    const figmaKey = (r.layer_name_figma || '').toLowerCase();
    const nameKey  = r.nombre_scannlab.toLowerCase();
    return (
      normalized.includes(figmaKey) ||
      figmaKey.includes(normalized) ||
      normalized.includes(nameKey) ||
      nameKey.includes(normalized)
    );
  });

  return partial || null;
}

/**
 * Convierte un LayerNode en formato ASCII tree
 */
function renderAsciiTree(node: LayerNode, prefix: string = '', isLast: boolean = true): string {
  const connector   = isLast ? '└── ' : '├── ';
  const childPrefix = isLast ? '    ' : '│   ';

  const row = findLibraryRow(node.name);
  const semanticHint = row ? `  → ${row.nombre_scannlab}` : '';

  let line = '';
  if (prefix === '') {
    line = `${node.name}${semanticHint}\n`;
  } else {
    line = `${prefix}${connector}${node.name}${semanticHint}\n`;
  }

  const childLines = node.children.map((child, index) => {
    const childIsLast = index === node.children.length - 1;
    return renderAsciiTree(child, prefix === '' ? childPrefix : prefix + childPrefix, childIsLast);
  });

  return line + childLines.join('');
}

/**
 * Enriquece el árbol de capas con datos de la librería de Supabase
 */
function enrichTreeWithLibrary(node: LayerNode): Array<{
  name: string;
  type: string;
  nombre_scannlab?: string;
  layer_name_figma?: string | null;
  categoria?: string | null;
  nivel_atomico?: string | null;
  definicion?: string | null;
  depth: number;
  hasChildren: boolean;
}> {
  const result: Array<{
    name: string;
    type: string;
    nombre_scannlab?: string;
    layer_name_figma?: string | null;
    categoria?: string | null;
    nivel_atomico?: string | null;
    definicion?: string | null;
    depth: number;
    hasChildren: boolean;
  }> = [];

  function traverse(n: LayerNode, depth: number) {
    const row = findLibraryRow(n.name);
    result.push({
      name:             n.name,
      type:             n.type,
      nombre_scannlab:  row?.nombre_scannlab,
      layer_name_figma: row?.layer_name_figma,
      categoria:        row?.categoria,
      nivel_atomico:    row?.nivel_atomico,
      definicion:       row?.definicion,
      depth,
      hasChildren: n.children.length > 0,
    });
    for (const child of n.children) {
      traverse(child, depth + 1);
    }
  }

  traverse(node, 0);
  return result;
}

// --------------- Punto de entrada -------

figma.showUI(__html__, {
  width: 560,
  height: 720,
  title: 'DS Doc Assistant',
  themeColors: true,
});

figma.ui.onmessage = (msg: PluginMessage) => {

  // La UI envía la librería de Supabase al main thread al cargarla
  if (msg.type === 'library-loaded' && msg.rows) {
    supabaseLibrary = msg.rows;
    return;
  }

  if (msg.type === 'generate-structure') {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Selecciona al menos un componente o frame en el canvas.',
      });
      return;
    }

    if (supabaseLibrary.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'La librería aún está cargando. Esperá un momento y volvé a intentarlo.',
      });
      return;
    }

    const results = selection.map((node) => {
      const tree     = buildLayerTree(node as SceneNode);
      const ascii    = renderAsciiTree(tree);
      const enriched = enrichTreeWithLibrary(tree);

      return {
        componentName: node.name,
        nodeType:      node.type,
        ascii,
        enriched,
        layerCount:    enriched.length,
      };
    });

    figma.ui.postMessage({
      type: 'structure-result',
      results,
    });
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
