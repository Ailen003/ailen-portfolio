# Revisar diseños con Playwright MCP

Los agentes usan la conexión Playwright MCP que ya ofrece su entorno para abrir
el portfolio, recorrerlo y revisar su aspecto. Este flujo utiliza el navegador
configurado en MCP; en el entorno comprobado es Chrome, en una sesión aislada.
No requiere añadir dependencias, pruebas automáticas ni descargar navegadores
desde este repositorio.

## Abrir este portfolio

Desde la raíz de `ai-portfolio`:

```powershell
pnpm dev
```

Si este checkout ya tiene un servidor abierto, reutilizarlo. Navegar con MCP a la
URL que indique Next.js, normalmente `http://localhost:3000/en`. Si otro proyecto
ocupa ese puerto, usar el puerto que indique la salida del servidor. También se
puede elegir otro al arrancar, por ejemplo `pnpm dev --port 3001`.

Confirmar que se está viendo este `ai-portfolio` y no `nairad-portfolio` u otro
ejemplo. La identidad actual, Elena Vargas, sirve como comprobación adicional;
actualizar esa referencia si cambia el contenido del proyecto.

No iniciar dos servidores de desarrollo en el mismo checkout: comparten el
bloqueo de `.next/dev`, aunque se usen puertos distintos.

## Flujo de revisión para agentes

1. Tomar un snapshot de accesibilidad para localizar elementos. Usar sus referencias
   o roles, nombres y etiquetas observados; actualizar el snapshot cuando cambie
   la interfaz.
2. Recorrer las pantallas modificadas en escritorio (1440×900) y móvil (393×851).
   Revisar `/en` y `/es`, y los temas claro y oscuro, según el alcance del cambio.
   Seleccionar el tema desde el control de la interfaz para revisar el estado
   deseado. El proyecto admite el tema del sistema y guarda las selecciones
   explícitas, que pueden prevalecer sobre el tema del sistema.
3. Abrir los menús, detalles de proyecto y galerías que se hayan modificado.
   Comprobar los estados de foco, navegación con teclado y cierre con Escape
   cuando corresponda. La revisión de diseño no incluye enviar el formulario de
   contacto ni mensajes al chatbot.
4. Esperar a que aparezcan los controles y se carguen fuentes e imágenes. Recorrer
   la página antes de una captura completa para activar el contenido diferido.
   Si se cambia una animación, revisarla también con movimiento normal.
5. Guardar capturas de la zona afectada y su contexto en `.playwright-mcp/`, y
   **abrirlas para inspeccionarlas visualmente**. Revisar espaciado, tipografía,
   imágenes, recortes, superposiciones y desplazamiento horizontal. Un snapshot
   de accesibilidad por sí solo no permite juzgar el diseño.
6. Consultar los errores de consola y las peticiones fallidas. Comunicar los
   problemas observados, distinguiendo los de la interfaz de los de servicios
   externos como GitHub.
7. Al terminar, indicar las rutas, tamaños, temas y estados realmente revisados,
   junto con las evidencias y cualquier limitación pendiente.

Herramientas habituales: `browser_navigate`, `browser_snapshot`, `browser_click`,
`browser_resize`, `browser_take_screenshot`, `browser_console_messages` y
`browser_network_requests`. Sus nombres exactos dependen del cliente del agente.

## Capturas y disponibilidad de MCP

Usar nombres descriptivos, por ejemplo
`.playwright-mcp/home-es-mobile-dark.png`. Resolver las rutas de salida desde la
raíz de este `ai-portfolio`. Si MCP toma como raíz el workspace padre, proporcionar
la ruta absoluta dentro de este checkout para guardar aquí las evidencias.
La carpeta ya está excluida de Git para que las capturas y registros no formen
parte del código del portfolio.

Si el agente no dispone de herramientas Playwright MCP, debe comunicar que no
pudo realizar la revisión en navegador. La conexión se configura en el cliente
del agente; no se resuelve instalando una dependencia en la aplicación.
Las reglas de este flujo también están en [AGENTS.md](../AGENTS.md).
