# Capítulo V. Landing Page, Responsive y Despliegue

## 5.1. Landing Page web - Desktop

La landing page de Apuray, propuesta de TransitPath Solutions para la movilidad en Lima Metropolitana, se desarrolló con HTML5, CSS3 y JavaScript puro. La vista de escritorio organiza el contenido en una cabecera de navegación, una sección principal con el planificador demostrativo, resultados de ejemplo, una representación esquemática del mapa, información sobre medios de transporte, explicación del funcionamiento, alertas, preguntas frecuentes, descarga informativa, contacto y pie de página.

La identidad visual conserva la paleta definida para el proyecto: azul `#1B4965`, azul oscuro `#112F42` y naranja `#FB8500`, utilizando `#0B2233` como color de texto sobre el naranja. Se mantiene una presentación sobria, con jerarquía tipográfica, tarjetas y espacios diferenciados para facilitar la lectura.

El planificador muestra tres alternativas con tiempos, tarifas y transbordos predefinidos. Estos valores se utilizan exclusivamente para demostrar la presentación y el ordenamiento de resultados; no se calculan recorridos reales. El mapa fue planteado como un esquema visual estático de zonas de referencia, no como cartografía, navegación ni seguimiento GPS.

## 5.2. Adaptación responsive de la Landing Page

La hoja `estilos.css` incorpora reglas responsive mediante puntos de quiebre de 900 px y 600 px. En tabletas y pantallas pequeñas, las cuadrículas principales pasan a una sola columna, el menú de navegación se convierte en un menú desplegable y los botones y formularios se reorganizan para aprovechar el ancho disponible.

En el punto de quiebre de 600 px se ajustan los márgenes, tamaños de títulos, espacios internos, botones de ordenamiento, enlaces del pie y dimensiones del esquema visual. También se contempla la preferencia del sistema por reducir las animaciones mediante `prefers-reduced-motion`.

La adaptación se implementa con CSS, sin bibliotecas externas ni frameworks.

## 5.3. Interacciones con el usuario

Las interacciones implementadas con JavaScript puro son:

- Apertura y cierre del menú móvil; al elegir un enlace, el menú se cierra.
- Aumento temporal del tamaño general del texto.
- Selección de ejemplos de origen, destino y hora.
- Presentación de tres alternativas demostrativas y ordenamiento por tiempo o tarifa referencial.
- Selección de una tarjeta de ruta mediante mouse o teclado.
- Apertura y cierre del formulario de reportes; los reportes agregados se muestran en la página durante la sesión actual.
- Expansión y contracción de respuestas en preguntas frecuentes.
- Mensajes informativos en los botones de descarga, sin descargar instaladores.
- Validación del formulario de contacto y confirmación visual local.

Estas interacciones no requieren backend. Los datos ingresados en reportes y contacto no se persisten ni se transmiten; al recargar o cerrar la página, los cambios temporales desaparecen.

## 5.4. Accesibilidad

Se incorporan etiquetas asociadas a los campos mediante `label` y `for`, nombres accesibles para las áreas de navegación, estados `aria-expanded` y `aria-pressed` en controles interactivos, mensajes de estado mediante regiones `aria-live` y `role="alert"`, y un enlace para saltar directamente al contenido principal.

Las tarjetas de resultados pueden seleccionarse con Enter o barra espaciadora. La ventana de reportes identifica su título y descripción, devuelve el foco al control que la abrió al cerrarse, admite Escape y mantiene la navegación por teclado dentro del diálogo. Los controles incluyen indicadores visibles de foco y se respeta la preferencia de movimiento reducido del sistema.

Estas medidas mejoran la navegación por teclado y la comprensión de los controles. No equivalen por sí solas a una certificación completa de conformidad WCAG; se recomienda realizar pruebas manuales adicionales.

## 5.5. Repositorio del proyecto

El proyecto se organiza en una estructura sencilla para facilitar su mantenimiento:

- `index.html`: estructura y contenido de la landing page.
- `estilos.css`: identidad visual, componentes y reglas responsive.
- `script.js`: lógica de las interacciones demostrativas.
- `.vscode/launch.json`: configuración opcional para abrir el proyecto en Chrome desde Visual Studio Code.
- `README.md`: alcance, estructura e instrucciones de ejecución y publicación.

Los tres archivos principales se mantienen en la raíz del proyecto para que las rutas relativas de CSS y JavaScript funcionen tanto en local como en GitHub Pages. Para la entrega, se debe subir esta estructura a un repositorio propio y añadir en el informe el enlace real una vez creado.

## 5.6. Despliegue en GitHub Pages

La publicación estática puede realizarse mediante GitHub Pages sin proceso de compilación. Se debe subir el contenido del proyecto a un repositorio, mantener `index.html` en la raíz y configurar **Settings → Pages → Deploy from a branch**, seleccionando la rama principal y la carpeta `/(root)`.

Después de guardar la configuración, GitHub Pages genera una dirección pública para el sitio. La URL del repositorio y la URL publicada deben incorporarse al informe únicamente después de realizar y verificar el despliegue.

La publicación conserva el alcance estático del prototipo: GitHub Pages sirve los archivos HTML, CSS y JavaScript, pero no añade almacenamiento, procesamiento de formularios, servicios de rutas ni información de movilidad en tiempo real.
