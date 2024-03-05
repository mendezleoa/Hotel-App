# Proyecto Hotel-App

Esta aplicación es un proyecto de React Vite hecho en colaboracion con otras herramientas para crear una interfaz que funcione para la visualizacion y manejo de la plataforma de hotel, en este caso llamada 'Hotel Bocconnó'. A continuación se detallan todos los elementos del procyecto.

## Instalación

1. Clona este repositorio.

2. Ejecuta `npm i` dentro del directorio 'BackEnd' y 'FrontEnd' para instalar las dependencias.

3. Ejecuta `npm run dev` dentro del directorio 'BackEnd' y 'FrontEnd' para ejecutar tanto la API como la aplicación.

4. En tu navegador abre la ruta `http://localhost:5173/` para abrir la página.

## Hotel Bocconnó

Bienvenido al **Hotel Bocconnó**, ubicado en la hermosa ciudad de **Boconó, Estado Trujillo, Venezuela**. Nuestro hotel ofrece una experiencia única para los viajeros que buscan comodidad, tranquilidad y hospitalidad.

### Acerca de Nosotros

- **Ubicación**: El Hotel Bocconnó se encuentra en el pintoresco municipio de Boconó, rodeado de montañas y naturaleza exuberante. Nuestra ubicación privilegiada permite a los huéspedes disfrutar de vistas panorámicas y un ambiente relajante.

- **Servicios y Comodidades**: En el Hotel Bocconnó, nos esforzamos por brindar un servicio excepcional. Nuestras instalaciones incluyen habitaciones cómodas y bien equipadas, un restaurante que ofrece delicias locales y una piscina para relajarse después de un día de exploración.

- **Exploración Local**: Boconó es conocido por su belleza natural, clima agradable y festivales culturales. Los huéspedes pueden visitar la Iglesia de San José, el Parque Nacional Dinira y disfrutar de actividades al aire libre como senderismo y paseos a caballo.

### ¿Por qué elegir el Hotel Bocconnó?

1. **Hospitalidad Trujillana**: Nuestro personal amable y atento está comprometido con hacer que su estadía sea inolvidable. Siempre estamos dispuestos a ayudar y proporcionar recomendaciones locales.

2. **Conexión con la Naturaleza**: Desde nuestro hotel, puede explorar los alrededores y disfrutar de la belleza natural de Trujillo. Las montañas, los ríos y los paisajes pintorescos están a su alcance.

3. **Descanso y Relajación**: Después de un día de aventuras, regrese al Hotel Bocconnó para descansar en nuestras cómodas habitaciones y disfrutar de la tranquilidad que ofrece nuestro entorno.

## Herramientas de Desarrollo

1. **Vite + React**: Vite es una herramienta de construcción rápida para proyectos de frontend. Te permite crear una estructura de proyecto con React de manera ágil y sin necesidad de configuración previa.Si quieres revisar más información ingresa a la página de [Vite](https://vitejs.dev/).

2. **Tailwind CSS**: Tailwind CSS es un framework de utilidades CSS que te permite diseñar rápidamente aplicaciones web.
   Más información sobre [Tailwind CSS con Vite](https://tailwindcss.com/docs/guides/vite).

3. **Node.js**: Node.js es un entorno de ejecución de JavaScript en el servidor. Asegúrate de tenerlo instalado en tu sistema. Puedes descargarlo desde el sitio oficial de [Node.js](https://nodejs.org/en).

4. **MongoDB**: MongoDB es una base de datos NoSQL ampliamente utilizada.

5. **jsonwebtoken**: jsonwebtoken es una biblioteca para generar y verificar tokens JWT (JSON Web Tokens). Puedes utilizarlo para autenticación y autorización en tu aplicación.

## Autor

- [@mendezleoa](https://www.github.com/mendezleoa) Programador Full-Stack

## Uso

Explica cómo utilizar el sistema o la aplicación. Proporciona ejemplos y guías claras.

## API de Terceros

Se utilizo la api de [Meteoblue](www.meteoblue.com), que contiene acceso a variables climaticas de la zona como temperatura o humedad, con limitaciones en cuanto a usos diarios de la api.

- **Meteoblue**:
  - **Método**: `GET`
  - **Descripción**: Obtiene datos meteorológicos de la página.
  - `fetch("URL_API")
   .then((response) => response.json())
   .then((weather) => {
      console.log(weather);
   });`

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.