// ============================================================
// DS Doc Assistant — code.js
// Versión compilada lista para usar en Figma
// Fuente: src/code.ts
// ============================================================

"use strict";

// --------------- Librería de nomenclatura (Módulo 2) --------
const NOMENCLATURE_LIBRARY = {
  // Contenedores
  "frame":        { definition: "Contenedor principal de layout", purpose: "Agrupa y organiza otros elementos con restricciones de diseño", usage: "Usar como raíz de componentes y secciones" },
  "autolayout":   { definition: "Frame con distribución automática", purpose: "Alinea hijos horizontal o verticalmente con spacing controlado", usage: "Preferir sobre frames manuales para layouts responsivos" },
  "group":        { definition: "Agrupación lógica sin layout", purpose: "Une capas relacionadas sin afectar el flujo de layout", usage: "Usar para organización semántica, no como sustituto de frames" },
  "component":    { definition: "Elemento reutilizable del Design System", purpose: "Define la fuente de verdad de un patrón de UI", usage: "Todo elemento repetible debe ser un componente" },
  "instance":     { definition: "Copia vinculada de un componente master", purpose: "Hereda propiedades del master con posibilidad de overrides locales", usage: "Usar en lugar de duplicar componentes directamente" },
  // Texto
  "label":        { definition: "Texto principal que identifica o describe", purpose: "Comunica la acción, nombre o estado del elemento", usage: "Debe ser conciso, claro y seguir convenciones de capitalización" },
  "title":        { definition: "Texto destacado de encabezado", purpose: "Jerarquiza visualmente la información principal", usage: "Usar para títulos de tarjetas, modales y secciones" },
  "description":  { definition: "Texto complementario de apoyo", purpose: "Amplía el contexto o explica el propósito del elemento", usage: "Usar con moderación; no debe duplicar el título" },
  "caption":      { definition: "Texto pequeño de acompañamiento", purpose: "Proporciona información secundaria o contextual", usage: "Ideal para metadatos, fechas, créditos" },
  "placeholder":  { definition: "Texto de guía dentro de campos vacíos", purpose: "Indica al usuario qué se espera en un input", usage: "No debe reemplazar al label; siempre acompañar ambos" },
  "text":         { definition: "Capa de texto genérica", purpose: "Muestra contenido textual sin jerarquía específica", usage: "Definir variante más específica (label, title, etc.) cuando sea posible" },
  // Iconos y medios
  "icon":         { definition: "Elemento visual simbólico", purpose: "Refuerza el significado o la acción asociada", usage: "Siempre acompañar con label accesible para usuarios de lector de pantalla" },
  "image":        { definition: "Contenido fotográfico o ilustrativo", purpose: "Aporta contexto visual o decorativo al componente", usage: "Definir tamaño y comportamiento de recorte explícitamente" },
  "avatar":       { definition: "Representación visual de un usuario o entidad", purpose: "Identifica a una persona u organización de forma compacta", usage: "Ofrecer fallback con iniciales cuando la imagen no carga" },
  "illustration": { definition: "Imagen decorativa o narrativa", purpose: "Enriquece la experiencia visual sin aportar información crítica", usage: "Marcar como aria-hidden si es puramente decorativa" },
  // Controles interactivos
  "button":       { definition: "Elemento de acción principal", purpose: "Desencadena una acción inmediata al ser activado", usage: "El label debe describir la acción, no el elemento (ej: 'Guardar', no 'Botón')" },
  "input":        { definition: "Campo de entrada de datos", purpose: "Recibe texto u otros valores del usuario", usage: "Siempre asociar con label visible y message de error" },
  "checkbox":     { definition: "Control de selección múltiple", purpose: "Permite activar/desactivar opciones independientes", usage: "No usar para opciones mutuamente excluyentes (usar radio en ese caso)" },
  "radio":        { definition: "Control de selección única en grupo", purpose: "Permite elegir una opción dentro de un conjunto exclusivo", usage: "Agrupar con fieldset/legend para accesibilidad" },
  "toggle":       { definition: "Interruptor de estado on/off", purpose: "Cambia un estado entre dos opciones opuestas", usage: "Reservar para cambios de configuración con efecto inmediato" },
  "select":       { definition: "Lista desplegable de opciones", purpose: "Permite elegir entre múltiples opciones en espacio reducido", usage: "Usar cuando haya más de 5 opciones; preferir radio para pocas" },
  "slider":       { definition: "Control de rango de valor", purpose: "Selecciona un valor dentro de un rango continuo", usage: "Mostrar siempre el valor actual numéricamente" },
  // Estructura y layout
  "header":       { definition: "Sección superior del componente", purpose: "Contiene información de encabezado o acciones primarias", usage: "Mantener consistencia en posición y altura entre componentes similares" },
  "footer":       { definition: "Sección inferior del componente", purpose: "Agrupa acciones secundarias o información complementaria", usage: "Usar para CTAs de confirmación/cancelación en formularios y modales" },
  "content":      { definition: "Zona principal de contenido", purpose: "Aloja el cuerpo informativo del componente", usage: "Diseñar para acomodar contenido de longitud variable" },
  "actions":      { definition: "Agrupación de controles de acción", purpose: "Centraliza los botones u opciones interactivas del componente", usage: "Ordenar acciones por importancia: primaria a la derecha" },
  "divider":      { definition: "Separador visual entre secciones", purpose: "Establece límites entre grupos de contenido", usage: "Preferir espaciado sobre líneas divisorias cuando sea posible" },
  "slot":         { definition: "Área flexible para contenido dinámico", purpose: "Permite inyectar contenido personalizado en el componente", usage: "Definir tamaño mínimo y máximo; documentar qué tipos de contenido acepta" },
  // Estado y feedback
  "badge":        { definition: "Indicador numérico o de estado compacto", purpose: "Comunica notificaciones, conteos o estados sin interrumpir el flujo", usage: "Limitar a valores numéricos cortos o indicadores binarios" },
  "tag":          { definition: "Etiqueta categorizadora", purpose: "Clasifica o describe el elemento al que está asociada", usage: "Usar vocabulario controlado del Design System" },
  "chip":         { definition: "Elemento de selección compacta", purpose: "Representa una entidad seleccionable o filtro activo", usage: "Incluir opción de eliminación cuando el chip sea removible" },
  "tooltip":      { definition: "Mensaje contextual en hover/focus", purpose: "Provee información adicional sin ocupar espacio permanente", usage: "Solo para información complementaria, no para datos críticos" },
  "alert":        { definition: "Mensaje de estado o notificación prominente", purpose: "Comunica información importante que requiere atención del usuario", usage: "Usar con moderación; reservar para errores, éxitos y advertencias clave" },
  // Navegación
  "nav":          { definition: "Contenedor de navegación", purpose: "Agrupa enlaces o acciones de desplazamiento entre vistas", usage: "Marcar el ítem activo claramente" },
  "breadcrumb":   { definition: "Ruta de navegación jerárquica", purpose: "Indica la posición del usuario dentro de la estructura del sitio", usage: "Incluir siempre la página actual como último elemento (no clicable)" },
  "tab":          { definition: "Pestaña de navegación entre paneles", purpose: "Organiza contenido relacionado en vistas alternables", usage: "No usar para navegación principal entre páginas distintas" },
  "link":         { definition: "Elemento de navegación textual", purpose: "Dirige al usuario a otra página, sección o recurso", usage: "El texto debe describir el destino, no 'haz clic aquí'" },
};

// --------------- Helpers ----------------------------------------

function buildLayerTree(node) {
  const result = {
    name: node.name,
    type: node.type,
    children: [],
  };
  if ('children' in node && node.children) {
    for (const child of node.children) {
      result.children.push(buildLayerTree(child));
    }
  }
  return result;
}

function findLibraryEntry(name) {
  if (NOMENCLATURE_LIBRARY[name]) return NOMENCLATURE_LIBRARY[name];
  for (const key of Object.keys(NOMENCLATURE_LIBRARY)) {
    if (name.includes(key) || key.includes(name)) {
      return NOMENCLATURE_LIBRARY[key];
    }
  }
  return null;
}

function renderAsciiTree(node, prefix, isLast) {
  if (prefix === undefined) prefix = '';
  if (isLast === undefined) isLast = true;

  const connector = isLast ? '└── ' : '├── ';
  const childPrefix = isLast ? '    ' : '│   ';
  const normalizedName = node.name.toLowerCase().trim();
  const libEntry = findLibraryEntry(normalizedName);
  const semanticHint = libEntry ? `  → ${libEntry.definition}` : '';

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

function enrichTreeWithLibrary(node) {
  const result = [];

  function traverse(n, depth) {
    const normalizedName = n.name.toLowerCase().trim();
    const libEntry = findLibraryEntry(normalizedName);
    result.push({
      name: n.name,
      type: n.type,
      definition: libEntry ? libEntry.definition : undefined,
      purpose: libEntry ? libEntry.purpose : undefined,
      usage: libEntry ? libEntry.usage : undefined,
      depth: depth,
      hasChildren: n.children.length > 0,
    });
    for (const child of n.children) {
      traverse(child, depth + 1);
    }
  }

  traverse(node, 0);
  return result;
}

// --------------- Punto de entrada --------------------------------

figma.showUI(__html__, {
  width: 560,
  height: 720,
  title: 'DS Doc Assistant',
  themeColors: true,
});

figma.ui.onmessage = function(msg) {
  if (msg.type === 'generate-structure') {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.ui.postMessage({
        type: 'error',
        message: 'Selecciona al menos un componente o frame en el canvas.',
      });
      return;
    }

    const results = selection.map(function(node) {
      const tree = buildLayerTree(node);
      const ascii = renderAsciiTree(tree);
      const enriched = enrichTreeWithLibrary(tree);
      return {
        componentName: node.name,
        nodeType: node.type,
        ascii: ascii,
        enriched: enriched,
        layerCount: enriched.length,
      };
    });

    figma.ui.postMessage({
      type: 'structure-result',
      results: results,
      library: NOMENCLATURE_LIBRARY,
    });
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
