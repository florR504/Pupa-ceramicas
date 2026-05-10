# 🌸 pupa cerámicas

Sitio web oficial de **pupa cerámicas** — emprendimiento de cerámica artesanal con sede en el barrio de Caballito, Buenos Aires. Cada pieza es única, moldeada a mano con barro y mucho amor.

---

## ✨ Sobre el proyecto

Esta SPA (Single Page Application) es la presencia digital de pupa cerámicas. Permite a los clientes:

- **Explorar la colección** de piezas disponibles (cargadas desde MongoDB)
- **Ver la galería** de trabajos de alumnos de los talleres
- **Leer y dejar reseñas** — moderadas antes de publicarse
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
| [MongoDB](https://www.mongodb.com/) | Base de datos (productos, reseñas, galería) |
| [Cloudinary](https://cloudinary.com/) | Almacenamiento y optimización de imágenes |
| [jose](https://github.com/panva/jose) | JWT para autenticación del panel admin |
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
│   ├── globals.css              # Variables CSS y tema de colores
│   ├── layout.tsx               # Fuentes (Fredoka + Nunito) y metadata
│   ├── page.tsx                 # Composición de secciones
│   ├── admin/
│   │   ├── page.tsx             # Login del panel de administración
│   │   └── dashboard/
│   │       └── page.tsx         # Dashboard: productos, galería, reseñas
│   └── api/
│       ├── products/route.ts    # GET productos públicos
│       ├── reviews/route.ts     # GET reseñas aprobadas, POST nueva reseña
│       ├── gallery/route.ts     # GET fotos de alumnos
│       └── admin/
│           ├── login/route.ts   # POST login (cookie JWT)
│           ├── logout/route.ts  # POST logout
│           ├── products/route.ts  # CRUD productos (autenticado)
│           ├── reviews/route.ts   # GET pendientes, PATCH aprobar/rechazar
│           └── gallery/route.ts   # POST/DELETE fotos de alumnos
│
├── lib/
│   ├── mongodb.ts               # Cliente MongoDB (lazy, compatible con Vercel)
│   ├── cloudinary.ts            # Upload y delete de imágenes
│   └── auth.ts                  # JWT: crear sesión, verificar, cookies
│
├── middleware.ts                # Protege /admin/dashboard con JWT
│
└── components/
    ├── Navbar/                  # Navegación con menú mobile
    ├── Hero/                    # Slideshow de fotos con fade automático
    ├── Footer/                  # Pie de página
    ├── Contact/                 # Formulario de contacto vía WhatsApp
    ├── AnimateOnScroll/         # Wrapper para animaciones on scroll
    │
    ├── Products/
    │   └── components/
    │       └── ProductCard/     # Tarjeta individual de producto
    │
    ├── WorkShop/
    │   └── components/          # Tarjeta de taller y banner de video
    │
    ├── About/                   # Historia + estadísticas
    │
    ├── Reviews/
    │   └── components/
    │       ├── ReviewCard/      # Tarjeta de reseña con estrellas
    │       └── StarRating/      # Estrellas interactivas y de solo lectura
    │
    ├── Gallery/
    │   └── components/
    │       ├── Photo/           # Foto con hover, chip de taller
    │       └── Lightbox/        # Overlay de imagen a pantalla completa
    │
    ├── PotteryCare/
    │   └── components/
    │       └── CareCard/        # Tarjeta de cuidado de cerámica
    │
    └── ui/                      # Componentes shadcn/ui
```

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz con:

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Admin
ADMIN_PASSWORD=contraseña_del_panel
ADMIN_JWT_SECRET=clave_secreta_para_jwt
```

En Vercel, configurar estas mismas variables en **Settings → Environment Variables**.

---

## Panel de administración

Accesible en `/admin`. Permite a la dueña de la tienda:

- **Productos**: agregar, editar y eliminar productos con imagen (subida a Cloudinary)
- **Galería**: subir y eliminar fotos de trabajos de alumnos
- **Reseñas**: aprobar o rechazar reseñas enviadas por clientes

La sesión se maneja con un JWT en cookie httpOnly. El middleware de Next.js protege todas las rutas bajo `/admin/dashboard`.

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build
```

El sitio corre en [http://localhost:3000](http://localhost:3000).

---

## Assets

Los archivos estáticos van en `public/assets/`:

```
public/assets/
├── images/    # Fotos de productos y hero
└── videos/
    ├── taller.mp4
    └── sincara.mp4
```

Las imágenes de productos y galería se almacenan en **Cloudinary** (carpeta `pupa/`).

---

## Ubicación

**Caballito, Buenos Aires**  
Entre Felipe Vallese y Av. Acoyte
