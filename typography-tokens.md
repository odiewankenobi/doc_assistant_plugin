# Design System — Typography Tokens

Documentación de todas las variables de tipografía organizadas en dos niveles:
1. **Primitivos** (`00. Typography`) — fuente y pesos base
2. **Semánticos** (`01. Typography`) — tamaños, alturas de línea y pesos con significado

---

## 1. Tipografía Primitiva

### Fuente
| Token | Valor |
|-------|-------|
| `font.Sora` | `"Sora"` |

### Pesos
| Token | Valor |
|-------|-------|
| `weight.w-300` | `300` |
| `weight.w-400` | `400` |
| `weight.w-600` | `600` |

---

## 2. Tokens Semánticos

### Fuente
| Token | Alias | Valor resuelto |
|-------|-------|----------------|
| `font.primary` | `font.Sora` | `"Sora"` |

### Font Size — Body
| Token | Valor |
|-------|-------|
| `font-size.body.small` | `12px` |
| `font-size.body.medium` | `14px` |
| `font-size.body.large` | `16px` |

### Font Size — Headings
| Token | Valor |
|-------|-------|
| `font-size.headings.h6` | `16px` |
| `font-size.headings.h5` | `18px` |
| `font-size.headings.h4` | `20px` |
| `font-size.headings.h3` | `24px` |
| `font-size.headings.h2` | `28px` |
| `font-size.headings.h1` | `32px` |

### Line Height — Body
| Token | Valor |
|-------|-------|
| `line-height.body.small` | `20px` |
| `line-height.body.medium` | `24px` |
| `line-height.body.large` | `24px` |

### Line Height — Headings
| Token | Valor |
|-------|-------|
| `line-height.headings.h6` | `20px` |
| `line-height.headings.h5` | `24px` |
| `line-height.headings.h4` | `28px` |
| `line-height.headings.h3` | `32px` |
| `line-height.headings.h2` | `36px` |
| `line-height.headings.h1` | `44px` |

### Font Weight
| Token | Alias | Valor resuelto |
|-------|-------|----------------|
| `font-weight.light` | `weight.w-300` | `300` |
| `font-weight.regular` | `weight.w-400` | `400` |
| `font-weight.semibold` | `weight.w-600` | `600` |

---

## Estilos tipográficos completos

Combinación de font-size + line-height para cada nivel. El peso no está definido por nivel en los tokens — se asigna según contexto (headings usan `semibold`, body usa `regular`).

### Headings
| Nivel | Font Size | Line Height | Font Weight sugerido |
|-------|-----------|-------------|----------------------|
| H1 | `32px` | `44px` | `semibold (600)` |
| H2 | `28px` | `36px` | `semibold (600)` |
| H3 | `24px` | `32px` | `semibold (600)` |
| H4 | `20px` | `28px` | `semibold (600)` |
| H5 | `18px` | `24px` | `semibold (600)` |
| H6 | `16px` | `20px` | `semibold (600)` |

### Body
| Tamaño | Font Size | Line Height | Font Weight sugerido |
|--------|-----------|-------------|----------------------|
| Large | `16px` | `24px` | `regular (400)` |
| Medium | `14px` | `24px` | `regular (400)` |
| Small | `12px` | `20px` | `regular (400)` |
