# 🌸 pupa cerámicas

Sitio web oficial de **pupa cerámicas** — emprendimiento de cerámica artesanal con sede en el barrio de Caballito, Buenos Aires. Cada pieza es única, moldeada a mano con barro y mucho amor.

---

## ✨ Sobre el proyecto

Esta SPA (Single Page Application) es la presencia digital de pupa cerámicas. Permite a los clientes:

- **Explorar la colección** de piezas disponibles
- **Inscribirse a talleres** de cerámica (clase de prueba y taller completo)
- **Encargar piezas personalizadas** — el pedido se envía directamente a la artista vía WhatsApp
- **Conocer la historia** detrás del emprendimiento y el espacio de trabajo

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework principal, App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilos utilitarios |
| [shadcn/ui](https://ui.shadcn.com/) | Componentes base (Input, Textarea, Label, Button) |
| [Fredoka](https://fonts.google.com/specimen/Fredoka) | Tipografía de títulos |
| [Nunito](https://fonts.google.com/specimen/Nunito) | Tipografía de cuerpo |

---

## 🎨 Identidad visual

Paleta derivada del logo de pupa cerámicas:

| Token | Color | Uso |
|---|---|---|
| `--pupa-pink` | `#F2A8C0` | Primario — CTAs, precios, acentos |
| `--pupa-mint` | `#8ECFC9` | Secundario — talleres, categorías |
| `--pupa-cream` | `#FDFAF9` | Fondo general |
| `--pupa-dark` | `#444444` | Texto principal |
| `--pupa-muted` | `#888888` | Texto secundario |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── globals.css          # Variables CSS y tema de colores
│   ├── layout.tsx           # Fuentes (Fredoka + Nunito) y metadata
│   └── page.tsx             # Composición de secciones
│
└── components/
    ├── Navbar.tsx            # Navegación con menú mobile
    ├── Hero.tsx              # Slideshow de fotos con fade automático
    ├── Footer.tsx            # Pie de página
    ├── Contact.tsx           # Formulario de contacto
    ├── AnimateOnScroll.tsx   # Wrapper para animaciones on scroll
    │
    ├── Products/
    │   ├── Products.tsx      # Slider responsive de productos
    │   └── components/
    │       └── card.tsx      # Tarjeta individual de producto
    │
    ├── WorkShop/
    │   ├── Workshops.tsx     # Sección de talleres
    │   └── components/
    │       ├── workshopCard.tsx   # Tarjeta individual de taller
    │       └── workshopView.tsx   # Banner de video del taller
    │
    ├── About/
    │   └── About.tsx         # Historia + estadísticas
    │
    └── ui/                   # Componentes shadcn/ui
        ├── button.tsx
        ├── input.tsx
        ├── textarea.tsx
        └── label.tsx
```

---

## 🚀 Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start
```

El sitio corre en [http://localhost:3000](http://localhost:3000).

---

## 🖼️ Assets

Los archivos estáticos van en `public/assets/`:

```
public/assets/
├── images/
│   ├── logo.jpeg             # Logo de pupa cerámicas
│   └── ...                   # Fotos de productos y hero
└── videos/
    ├── taller.mp4            # Video del taller (banner en sección Talleres)
    └── sincara.mp4
```

---

## 🛒 Sistema de pedidos (próximamente)

Los encargos de piezas se gestionan vía **WhatsApp**. Al hacer clic en "Ver pieza", el cliente inicia una conversación con la artista con los datos del producto pre-completados.

Integración planeada:
```
https://wa.me/549XXXXXXXXXX?text=Hola!+Me+interesa+la+pieza+[nombre]+por+[precio]
```

Cada `ProductCard` recibirá la URL de WhatsApp como prop, armada dinámicamente con el nombre y precio de la pieza.

---

## 📍 Ubicación

**Caballito, Buenos Aires**  
Entre Felipe Vallese y Av. Acoyte

---

## 📬 Contacto

- Email: hola@pupaceramicas.com
- WhatsApp: +54 9 11 XXXX-XXXX
