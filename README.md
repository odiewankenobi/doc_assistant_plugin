# DS Doc Assistant — Plugin de Figma

**Sistema de documentación asistida para componentes del Design System**

---

## ¿Qué hace este plugin?

DS Doc Assistant combina dos módulos complementarios dentro de un mismo plugin de Figma:

| Módulo | Descripción |
|--------|-------------|
| **Módulo 1 — Estructura** | Analiza el componente seleccionado y genera automáticamente un diagrama ASCII de su jerarquía de capas |
| **Módulo 2 — Librería** | Enriquece cada capa con su definición, propósito y buenas prácticas de uso, tomadas de una librería de nomenclatura centralizada |

### Ejemplo de output — Diagrama estructural enriquecido

```
Button  → Elemento de acción principal
└── Icon  → Elemento visual simbólico
└── Label  → Texto principal que identifica o describe
```

---

## Estructura de archivos

```
ds-doc-plugin/
├── manifest.json       ← Configuración del plugin (requerido por Figma)
├── code.js             ← Lógica principal - main thread (listo para usar)
├── ui.html             ← Interfaz de usuario del plugin
├── src/
│   └── code.ts         ← Fuente TypeScript (para desarrollo)
├── package.json        ← Dependencias de desarrollo
├── tsconfig.json       ← Configuración TypeScript
└── README.md           ← Este archivo
```

---

## Instalación en Figma

### Opción A — Desarrollo local (recomendado para iterar)

1. Abre **Figma Desktop App** (obligatorio para desarrollo de plugins)
2. Ve a `Plugins → Development → Import plugin from manifest...`
3. Selecciona el archivo `manifest.json` de esta carpeta
4. El plugin aparece bajo `Plugins → Development → DS Doc Assistant`

### Opción B — Sin compilación (uso inmediato)

Los archivos `code.js` y `ui.html` ya están listos para uso directo.  
No necesitas compilar ni instalar dependencias para usar el plugin.

### Opción C — Desarrollo con TypeScript

```bash
# 1. Instalar dependencias
npm install

# 2. Compilar TypeScript a JS
npx tsc

# 3. Para watch mode (recompila automáticamente)
npx tsc --watch
```

> **Nota:** Si compilas, el archivo `dist/code.js` debe ser referenciado en el `manifest.json`.  
> Para desarrollo simple, usa directamente `code.js` en la raíz.

---

## Uso del plugin

### Tab 1 — Estructura (Módulo 1 + 2 integrados)

1. En el canvas de Figma, **selecciona uno o más componentes/frames**
2. Abre el plugin: `Plugins → Development → DS Doc Assistant`
3. Haz clic en **"✦ Generar documentación del componente"**
4. El plugin muestra:
   - **Diagrama ASCII** con la jerarquía de capas (copiable con un clic)
   - **Tabla enriquecida** con definición, propósito y buenas prácticas de cada capa

### Tab 2 — Librería (Módulo 2 standalone)

- Busca cualquier término de naming (`label`, `icon`, `slot`, `button`…)
- Filtra por categorías: Contenedores, Texto, Controles, Estructura, etc.
- Consulta la definición, propósito y guía de uso de cada elemento

---

## Categorías de la librería

| Categoría | Elementos incluidos |
|-----------|-------------------|
| Contenedores | frame, autolayout, group, component, instance |
| Texto | label, title, description, caption, placeholder, text |
| Iconos/Media | icon, image, avatar, illustration |
| Controles | button, input, checkbox, radio, toggle, select, slider |
| Estructura | header, footer, content, actions, divider, slot |
| Feedback | badge, tag, chip, tooltip, alert |
| Navegación | nav, breadcrumb, tab, link |

---

## Cómo funciona (arquitectura)

El plugin sigue la arquitectura de dos threads de Figma:

```
┌─────────────────────────────┐     ┌──────────────────────────────┐
│   Main Thread (code.js)     │     │   UI Thread (ui.html)        │
│                             │     │                              │
│  • Lee capas del canvas     │────►│  • Muestra diagrama ASCII    │
│  • Construye árbol de nodos │     │  • Tabla enriquecida         │
│  • Aplica librería          │◄────│  • Librería con búsqueda     │
│  • Envía resultado a UI     │     │  • Filtros por categoría     │
└─────────────────────────────┘     └──────────────────────────────┘
         figma.ui.postMessage() / parent.postMessage()
```

### Matching semántico

El algoritmo de matching busca entradas en la librería de la siguiente manera:
1. **Exact match**: el nombre de la capa es idéntico a una clave de la librería
2. **Partial match**: la clave aparece dentro del nombre de la capa o viceversa
3. **Sin match**: se indica que la capa no tiene definición y se sugiere revisar el naming

---

## Cómo extender la librería

La librería de nomenclatura se define en `code.js` (y su fuente en `src/code.ts`) como el objeto `NOMENCLATURE_LIBRARY`. Para agregar nuevos elementos:

```javascript
"mi-elemento": {
  definition: "Definición clara del elemento",
  purpose: "Para qué sirve dentro de un componente",
  usage: "Cómo y cuándo usarlo correctamente"
}
```

---

## Requerimientos técnicos

| Requisito | Detalle |
|-----------|---------|
| Figma Desktop App | Obligatorio para instalar plugins en desarrollo |
| Figma versión | Cualquier versión actual (Plugin API 1.0.0) |
| TypeScript | Solo necesario para modificar `src/code.ts` |
| Node.js | Solo necesario para compilar TypeScript |
| Editores compatibles | Figma Design, FigJam |

---

## Publicación en Figma Community

Para publicar el plugin en la comunidad de Figma:

1. Completar el formulario **Data Security Assessment**
2. Proveer iconos en tamaños: `16px`, `24px`, `32px`, `128px`
3. Agregar screenshots del plugin en funcionamiento
4. Verificar que `manifest.json` tenga `id` único y datos completos
5. Someter a revisión desde `Plugins → Publish`

> Las actualizaciones posteriores a la aprobación inicial no requieren revisión adicional.

---

## Consideraciones de calidad

- La calidad del matching semántico depende directamente del **naming de capas** en Figma
- Se recomienda establecer **convenciones de naming** en el equipo antes de usar el plugin
- El plugin no genera contenido semántico: lo complementa y enriquece
- Las capas sin match no son un error; indican términos que pueden incorporarse a la librería

---

*Fuente técnica: developers.figma.com · Plugin API Docs · Marzo 2026*
