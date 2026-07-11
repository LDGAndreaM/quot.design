# Quot.Design

Cotizador mobile-first para diseñadores gráficos y profesionales del marketing freelance en México. Cualquiera puede
consultar la lista de precios de referencia sin cuenta; los diseñadores registrados obtienen un dashboard, una lista
de precios editable, un asistente de cotización en 4 pasos, una vista previa/PDF imprimible y un historial de
cotizaciones.

Este proyecto es la implementación en producción del prototipo de diseño (`Cotizador.dc.html`, Claude Design).

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como build tool
- [Tailwind CSS v4](https://tailwindcss.com/) para estilos
- [React Router](https://reactrouter.com/) para navegación
- Estado en `Context` de React, persistido en `localStorage` (sin backend todavía — ver [Roadmap](#roadmap-para-producción-completa))

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción (tsc + vite build)
npm run preview   # sirve el build de producción localmente
```

## Estructura

```
src/
  components/   Componentes compartidos (TopBar, BottomNav, Logo, modales, etc.)
  context/      AppContext: estado global (auth, catálogo, carrito, historial)
  data/         Catálogo de 74 servicios y condiciones predefinidas
  lib/          Helpers de formato, agrupación de catálogo, etc.
  pages/        Una página por pantalla del cotizador
```

## Despliegue

### GitHub Pages (incluido)

Este repo incluye `.github/workflows/deploy.yml`, que compila y publica el sitio en GitHub Pages en cada push a
`main`. Para activarlo:

1. Ve a **Settings → Pages** en GitHub y en "Source" selecciona **GitHub Actions**.
2. Haz merge de esta rama a `main` (o vuelve a correr el workflow manualmente desde la pestaña Actions).
3. El sitio quedará publicado en `https://<usuario>.github.io/cuot.design/`.

Si vas a usar un dominio propio (por ejemplo `cuot.design`), agrega un archivo `public/CNAME` con el dominio y
configura el DNS según la [documentación de GitHub Pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

### Vercel / Netlify (alternativa)

También puedes importar el repo directamente en Vercel o Netlify — ambos detectan Vite automáticamente
(`npm run build`, carpeta de salida `dist`). Como usa client-side routing, configura un rewrite/fallback a
`index.html` para rutas desconocidas (Vercel y Netlify lo hacen automático para proyectos Vite/SPA).

## App stores (iOS / Android) vía Capacitor

Esta app web ya está preparada para empaquetarse como app nativa con [Capacitor](https://capacitorjs.com/): usa
`HashRouter` (no depende de un servidor para el ruteo) y controla la barra de estado nativa cuando corre empaquetada
(`src/App.tsx`). `capacitor.config.ts` ya está configurado (`appId: com.bnwstudio.quotdesign`).

Los proyectos nativos (`android/`, `ios/`) **no están generados en este repo** — se crean localmente porque requieren
herramientas que no viven aquí (Android Studio / Xcode). Pasos, desde tu máquina:

```bash
git pull
npm install

# Android (requiere Android Studio instalado — incluye el SDK)
npx cap add android
npm run cap:sync
npx cap open android
# En Android Studio: Build → Generate Signed Bundle/APK → sube el .aab a Google Play Console

# iOS (requiere macOS + Xcode)
npx cap add ios
npm run cap:sync
npx cap open ios
# En Xcode: Product → Archive → Distribute App → sube a App Store Connect
```

Después de la primera vez, `npm run cap:sync` (compila el sitio y sincroniza los assets a ambos proyectos nativos)
es lo único que necesitas correr cada vez que cambies el código.

**Antes de someter a las stores necesitas:**
- Cuenta de [Google Play Console](https://play.google.com/console) (pago único ~$25 USD) y de
  [Apple Developer Program](https://developer.apple.com/programs/) ($99 USD/año).
- Ícono y splash screen de la app (usa [`@capacitor/assets`](https://github.com/ionic-team/capacitor-assets) para
  generarlos automáticamente a partir de un solo PNG/SVG fuente — hoy el proyecto usa el ícono placeholder de
  `public/favicon.svg`, hay que reemplazarlo por el logo final de Black and White Studio).
- Política de privacidad pública (obligatoria en ambas stores, incluso para apps simples) — importante una vez que
  el login/datos de cotizaciones sean reales y no solo `localStorage` de demo.
- Capturas de pantalla y descripción de la ficha de la app.

## Roadmap para producción completa

El prototipo original se construyó como una demo de un solo estado de React. Esta implementación ya usa rutas
reales, componentes idiomáticos y persistencia en `localStorage`, pero para producción completa falta:

- **Autenticación real** (hoy el login es una demo sin backend — cualquier correo "inicia sesión").
- **Backend/API** para guardar cuentas, precios personalizados e historial de cotizaciones por diseñador (hoy vive
  en `localStorage` del navegador).
- **Generación de PDF real** (hoy "Descargar PDF" usa `window.print()`); se puede migrar a una librería como
  `jsPDF`/`html2canvas` o generación server-side.
- **Subida de logo a almacenamiento real** (hoy se guarda como `data:` URL en el estado local).
- Reemplazar los assets de marca placeholder (`favicon.svg`, ícono en `TopBar`) por los archivos finales de
  Black and White Studio.
