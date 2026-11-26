# Apuray — TransitPath Solutions

Prototipo académico de una landing page para movilidad en Lima Metropolitana.

## Tecnologías y alcance

- HTML5 para la estructura.
- CSS3 para identidad visual y adaptación responsive.
- JavaScript puro para interacciones demostrativas.
- No utiliza frameworks, backend, bases de datos, `localStorage`, APIs de rutas, GPS ni cálculo de tráfico en tiempo real.

Los tiempos, tarifas, alternativas, alertas y referencias visuales del mapa son datos de ejemplo. Los reportes y mensajes de contacto solo modifican la vista actual del navegador y no se guardan ni se envían a un servidor. Los botones de descarga informan que no existen instaladores.

## Archivos

- `index.html`: contenido y estructura.
- `estilos.css`: estilos, componentes, accesibilidad visual y breakpoints responsive.
- `script.js`: menú, tamaño de texto, resultados ficticios, ordenamiento, reportes temporales, FAQ y formularios.
- `.vscode/launch.json`: configuración opcional de depuración en Chrome.
- `CAPITULO_V.md`: texto técnico del informe alineado con el prototipo.

## Ejecutar en local

1. Descomprime el proyecto.
2. Abre la carpeta que contiene `index.html` en Visual Studio Code.
3. Instala o habilita Live Server si aún no lo tienes.
4. Haz clic derecho en `index.html` y selecciona **Open with Live Server**.
5. Comprueba que la dirección local abre `index.html` y que `estilos.css` y `script.js` cargan sin errores.

También puedes abrir `index.html` directamente en un navegador moderno; Live Server es preferible para probar el mismo flujo que usarás durante el desarrollo.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta manteniendo `index.html` en la raíz.
2. En el repositorio, entra en **Settings → Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona la rama principal (por ejemplo, `main`) y la carpeta `/(root)`.
5. Guarda la configuración y espera a que GitHub Pages publique el sitio.
6. Abre la URL publicada y revisa nuevamente navegación, estilos, scripts y formularios.

No se incluye una URL de repositorio ni de publicación porque no fueron proporcionadas y todavía no se ha realizado el despliegue.
