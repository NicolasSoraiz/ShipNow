# ShipNow API

API desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, productos, pedidos y entregas.

El proyecto incorpora generacion de datos simulados, carga de datos de prueba, manejo centralizado de errores, un sistema de logging con Winston, documentación interactiva mediante Swagger y pruebas funcionales y carga de archivos mediante Multer.

La aplicación utiliza una arquitectura por capas para separar las responsabilidades y facilitar el mantenimiento y la escalabilidad del código.

## Tecnologías

* Node.js
* Express
* MongoDB
* Mongoose
* dotenv
* Multer
* Winston
* Winston-Daily-rotate-file
* swagger-jsdoc
* swagger-ui-express
* Mocha
* Chai
* Supertest
* Cross-env
* Docker

## Arquitectura

El proyecto utiliza una arquitectura de tres capas:

```text
Controller → Service → Repository → Database
```

### Controller

Es el punto de entrada de las peticiones HTTP.

Sus responsabilidades son:

* Recibir las solicitudes.
* Obtener los parámetros y datos de la petición.
* Llamar al Service correspondiente.
* Devolver la respuesta HTTP.
* Enviar los errores al middleware global mediante next(error).

Los controllers no realizan consultas directamente a MongoDB.

### Service

Contiene la lógica de negocio de la aplicación.

Sus responsabilidades incluyen:

* Aplicar las reglas de negocio.
* Definir valores por defecto.
* Procesar los datos antes de enviarlos al Repository.
* Gestionar errores especificos del dominio.
* Coordinar la generación de datos simulados.
* Coordinar la carga de datos de prueba.
* Registrar eventos relevantes mediante Winston.

### Repository

Se encarga del acceso a los datos mediante Mongoose.

Entre las operaciones utilizadas se encuentran:

```js
User.find(...)
User.findById(...)
User.create(...)
```

para los productos:

```js
Product.find(...)
Product.findById(...)
Product.create(...)
```

Los repositories también permiten insertar los datos generados por el sistema de mocking.

De esta forma, el Service no necesita conocer cómo se realizan las consultas a MongoDB.

## Estructura del proyecto

```text
├── src/
│   ├── app.js
│   ├── server.js
│    
|   ├── config/
|       ├── database.js
│       ├── env.config.js
|       ├── logger.js
│       ├── upload.config.js
|       ├── swagger.js
|       └── swagger/
|           └── schemas.js
│     
|   ├── constants/
│   └── index.js
│
|   ├── controllers/
│       ├── product.controller.js
│       |── user.controller.js
|       |── mock.controller.js
|       ├── logger.controller.js
│       └── order.controller.js
|   
|   ├── errors/
|       ├── custom.error.js
|       └── error.dictionary.js
|
|   ├── middlewares/
│       └── error.middlewares.js
│
|   ├── models/
│       ├── Product.js
│       |── User.js
|       |── Order.js
|       └── Delivery.js
|
|   ├── mock/
|       ├── user.mock.js
|       ├── driver.mock.js
|       ├── order.mock.js
|       └── delivery.mock.js
│
|   ├── repositories/
│       ├── product.repository.js
│       |── user.repository.js
|       ├── mock.repository.js
│       └── order.repository.js
│
|   ├── routes/
│        ├── product.routes.js
│        |── user.routes.js
|        |── mock.routes.js
|        ├── logger.routes.js
│        └── order.routes.js
│
|   ├── services/
│       ├── product.service.js
│       |── user.service.js
|       ├── mock.service.js
│       └── order.service.js
│
├── tests/
│   ├── setup.js
│   ├── users/
│   │   ├── users.test.js
│   │   ├── document-test.png
│   │   ├── invalid-document.txt
│   │   └── large-document.png
│   ├── products/
│   │   └── products.test.js
│   ├── orders/
│   │   └── orders.test.js
│   ├── mocks/
│   │   └── mocks.test.js
│   └── system/
│       └── system.test.js
|
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
├── app.js
└── server.js

├── uploads/
├── logs/
├── .env
├── .env.test
```

La carpeta uploads/ almacena los archivos cargados por los usuarios. Se generan automáticamente las subcarpetas necesarias para documentos y comprobantes.

La carpeta logs/ almacena los registros generados por Winston.

Las carpetas uploads/ y logs/, junto con node_modules/ y los archivos de entorno, están excluidas del repositorio mediante .gitignore.

## Instalación

# Requisitos previos

Para ejecutar el proyecto localmente se necesita:

- Node.js.
- npm.
- MongoDB.
- Git.

Clonar el repositorio y acceder a la carpeta del proyecto.

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

El proyecto utiliza variables de entorno para configurar la aplicación según el entorno de ejecución.

Se incluye un archivo .env.example como referencia para crear la configuración local.

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow
LOG_LEVEL=debug
```

# Variables disponibles

Variable         Descripción

NODE_ENV      Entorno de ejecución: development, test o production

PORT          Puerto en el que se inicia el servidor

MONGODB_URI   Dirección de conexión a MongoDB

LOG_LEVEL     Nivel mínimo de logging

La aplicación valida las variables requeridas al iniciar.

Se verifica que:

- Existan las variables obligatorias.
- NODE_ENV corresponda a un entorno permitido.
- PORT sea un número entero entre 1 y 65535.
- LOG_LEVEL, cuando se especifica, corresponda a un nivel admitido.

Si la configuración es inválida, el servidor no inicia correctamente.

El archivo .env contiene la configuración local de la aplicación y no debe subirse al repositorio.

## Ejecución local

Para iniciar la aplicación:

```bash
npm start
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

La aplicación requiere que MongoDB esté funcionando y que la variable MONGODB_URI apunte a una base de datos disponible.

## Health Check

ShipNow incorpora un endpoint para comprobar que la aplicación se encuentra respondiendo correctamente.

Endpoint:

GET /health

URL local:

http://localhost:3000/health

La respuesta incluye:

- Estado de la aplicación.
- Mensaje de funcionamiento.
- Entorno de ejecución.
- Tiempo de actividad del proceso.
- Fecha y hora de la respuesta.

Ejemplo:

{
        "status": "success",
        "message": "ShipNow API funcionando correctamente",
        "environment": "development",
        "uptime": 120.5,
        "timestamp": "2026-11-17T14:28:08.525Z"
}

Este endpoint verifica que la aplicación Express responde correctamente. No realiza una comprobación independiente de la disponibilidad de MongoDB.

## Documentación de la API con Swagger

ShipNow utiliza Swagger para documentar y explorar los endpoints de su API REST.

### Acceso a Swagger UI

Con el servidor iniciado en un entorno distinto de producción, abrir:

http://localhost:3000/api/docs

Desde esta interfaz se pueden consultar los endpoints documentados, sus parámetros, los cuerpos de las solicitudes y las respuestas previstas.

### Organización de la documentación

La configuración de Swagger se encuentra separada de las rutas de la aplicación:

- `src/config/swagger.js`: configuración general de OpenAPI, información de la API, servidor y etiquetas.
- `src/config/swagger/schemas.js`: schemas reutilizables para las respuestas y los modelos documentados.
- `src/routes/`: rutas y anotaciones Swagger correspondientes a las operaciones de la API.

### Módulos documentados

- **Users:** consulta, búsqueda por ID y creación de usuarios.
- **Products:** consulta, búsqueda por ID y creación de productos.
- **Orders:** consulta, búsqueda por ID y creación de pedidos.
- **Mocks:** generación de usuarios, conductores, pedidos y entregas simulados, y carga de datos de prueba.
- **Logger:** endpoint de prueba para verificar los niveles de logging.

### Schemas reutilizables

La documentación incluye los siguientes schemas:

- `User`: estructura del usuario.
- `OrderItem`: producto y cantidad dentro de un pedido.
- `Order`: estructura del pedido.
- `Delivery`: estructura de la entrega.
- `ErrorResponse`: formato uniforme de errores.
- `SuccessResponse`: formato genérico de respuesta exitosa.

## Endpoints

### Products

Obtener todos los productos:

```http
GET /api/products
```

Obtener un producto por ID:

```http
GET /api/products/:id
```

Crear un producto:

```http
POST /api/products
```

Ejemplo:

```json
{
        "name": "Auriculares Bluetooth",
        "description": "Auriculares inalámbricos para uso diario",
        "price": 25000,
        "stock": 10
}
```

### Users

Obtener todos los usuarios:

```http
GET /api/users
```

Obtener un usuario por ID:

```http
GET /api/users/:id
```

Crear un usuario:

```http
POST /api/users
```

Ejemplo:

```json
{
        "name": "Nicolás",
        "email": "nicolas@example.com"
}
```

## Orders

Obtener todos los pedidos:

```http
GET /api/orders
```

Obtener un pedido por ID:

```http
GET /api/orders/:id
```

Crear un pedido:

```http
POST /api/orders
```

Ejemplo:

{
  "user": "ID_DEL_USUARIO",
  "items": [
    {
      "product": "ID_DEL_PRODUCTO",
      "quantity": 2
    }
  ]
}

Los pedidos contienen información del usuario asociado, productos, cantidades, estado, prioridad y total.

# Paginacion

Los endpoints de usuarios y pedidos incorporan paginación para optimizar la consulta de colecciones grandes.

Se utilizan dos parámetros opcionales:

Parámetro             Descripción                Valor predeterminado

page             Número de página solicitada              1

limit        Cantidad máxima de resultados por página    10

El límite máximo permitido es de 100 registros por página.

Ejemplo:

GET /api/users?page=1&limit=10

GET /api/orders?page=2&limit=5

La respuesta incluye información sobre los resultados y la paginación:

{
        "status": "success",
        "results": 10,
        "pagination": {
        "page": 1,
        "limit": 10,
        "totalPages": 2
},
"data": []
}

El campo data contiene los registros correspondientes a la página solicitada.

La paginación se implementa en los repositories mediante consultas con skip, limit y conteo de documentos.

## Carga de archivos

El proyecto incorpora Multer para gestionar la carga de archivos mediante solicitudes multipart/form-data.

La configuración se encuentra centralizada en: src/config/upload.config.js

## Configuración de carga

La aplicación establece las siguientes restricciones:

- Tipos de archivo permitidos: PDF, JPEG y PNG.
- Tamaño máximo por archivo: 5 MB.
- Cantidad máxima: un archivo por solicitud.
- Los archivos se almacenan en el servidor.
- Los nombres de archivo se generan mediante UUID para evitar colisiones.
- Los archivos binarios no se almacenan directamente en MongoDB; se guarda su metadata y ubicación.

## Documentos de usuarios

Endpoint:

POST /api/users/:id/documents

Permite asociar un documento a un usuario existente.

La solicitud debe enviarse utilizando multipart/form-data.

Campos:

Campo             Tipo           Descripción
document          File       Archivo que se desea cargar
documentType      Text       Tipo de documento

Tipos de documento admitidos:

- DNI
- LICENSE
- OTHER

Los archivos se almacenan en: uploads/users/

La información del documento se guarda asociada al usuario en MongoDB, incluyendo metadata como:

- Nombre original.
- Nombre generado.
- Ruta del archivo.
- Tipo MIME.
- Tamaño.
- Fecha de carga.
- Tipo de documento.

## Comprobantes de pedidos

Endpoint: POST /api/orders/:id/receipts

Permite asociar un comprobante a un pedido existente.

La solicitud debe enviarse utilizando multipart/form-data.

Campo:

Campo            Tipo        Descripción
receipt          File    Comprobante que se desea cargar

Los archivos se almacenan en: uploads/receipts/

La metadata del comprobante queda asociada al pedido correspondiente en MongoDB.

## Validaciones de archivos

El sistema contempla las siguientes validaciones:

- Verificar que se haya enviado un archivo.
- Verificar que el tipo de archivo esté permitido.
- Controlar el tamaño máximo.
- Verificar que el usuario o pedido exista.
- Validar el tipo de documento cuando corresponda.
- Manejar los errores generados por Multer.

Cuando ocurre un error durante el proceso, el sistema contempla la limpieza de los archivos temporales o cargados que no pudieron asociarse correctamente al recurso.

## Mocking y carga de datos de prueba

El proyecto incorpora un sistema de generación de datos simulados para realizar pruebas sin tener que ingresar manualmente todos los registros.

Los endpoints de mocking se encuentran agrupados bajo:

```http
/api/mocks
```

El parámetro qty permite indicar la cantidad de elementos que se desean generar. Es opcional y su valor predeterminado es 1.

Los endpoints GET generan datos simulados y no los guardan en MongoDB.

Generar usuarios

```http
GET /api/mocks/users?qty=2
```

Genera usuarios simulados con sus datos correspondientes.

Generar repartidores

```http
GET /api/mocks/drivers?qty=2
```

Genera usuarios con el rol DRIVER.

Generar pedidos

```http
GET /api/mocks/orders?qty=2
```

Genera pedidos simulados con:

* Usuario asociado.
* Producto asociado.
* Cantidad.
* Estado.
* Prioridad.
* Total.

Los pedidos generados mediante este endpoint no se guardan en MongoDB.

Generar entregas

```http
GET /api/mocks/deliveries?qty=2
```

Genera entregas simuladas asociadas a un pedido, un repartidor y un estado de entrega.

Las entregas generadas mediante este endpoint no se guardan en MongoDB.

Seed de Datos

El sistema también permite generar e insertar datos de prueba directamente en MongoDB.

endpoint: 

```http
POST /api/mocks/seed?qty=10
```

El parámetro qty indica la cantidad de registros principales que se generarán.

El seed genera y guarda:

* Usuarios.
* Repartidores.
* Productos.
* Pedidos.
* Entregas.

Las relaciones entre los registros se generan automáticamente.

A diferencia de los endpoints GET de mocking, el endpoint POST de seed sí persiste los datos en MongoDB.

## Validación del parámetro qty

Los endpoints de mocking validan que qty sea un número entero mayor que cero y que no supere el máximo de 100.

Por ejemplo:

```http
GET /api/mocks/users?qty=-101
```

Devuelve un error HTTP 400 con el código INVALID_MOCK_QUANTITY.

## Manejo centralizado de errores

El proyecto cuenta con un middleware global de manejo de errores.

Los errores son enviados mediante next(error) hasta el middleware global, que determina el codigo HTTP y la respuesta correspondiente.

El flujo es:

Controller
    ↓
Service
    ↓
CustomError o error de mongoose
    ↓
Error Middleware
    ↓
Respuesta HTTP

## Estructura de las respuestas de error

Las respuestas de error utilizan una estructura uniforme:

{
        "status": "error",
        "code": "CODIGO_DEL_ERROR",
        "message": "Descripción del error"
}

Esta estructura permite que los clientes de la API interpreten los errores de manera consistente.

## Errores de dominio

Los errores específicos de la aplicación se encuentran centralizados en: src/errors/error.dictionary.js

Los errores personalizados utilizan: src/errors/custom.error.js

Errores definidos:

Código                  HTTP            Descripcion

USER_NOT_FOUND          404           Usuario no encontrado

PRODUCT_NOT_FOUND       404           Producto no encontrado

ORDER_NOT_FOUND         404           Pedido no encontrado

DELIVERY_NOT_FOUND      404           Entrega no encontrada

INVALID_MOCK_QUANTITY   400           Cantidad de mocks inválida

INVALID_DATA            400           Datos enviados no válidos

MOCK_SEED_ERROR         500           Error al cargar datos de prueba

Los errores específicos pueden variar según la operación y las validaciones que se ejecuten.

## Errores de Mongoose

El middleware también transforma determinados errores de Mongoose en respuestas uniformes.

Se manejan: 

- ValidationError: datos que no cumplen las validaciones del modelo.
- CastError: identificadores o datos con formato inválido.
- E11000: intento de insertar un dato duplicado.

Estos errores se responden con el código INVALID_DATA cuando corresponde.

## Errores de Multer

El middleware global contempla los errores generados durante la carga de archivos.

Entre ellos:

- LIMIT_FILE_SIZE: archivo que supera el tamaño máximo permitido.
- LIMIT_UNEXPECTED_FILE: nombre de campo inesperado.
- LIMIT_FILE_COUNT: cantidad de archivos superior a la permitida.

De esta manera, los errores de carga también mantienen una respuesta JSON uniforme.

Ruta inexistente

Las rutas que no existen utilizan el sistema centralizado de errores.

Por ejemplo: GET /api/esto-no-existe

Devuelve una respuesta HTTP 404:

{
        "status": "error",
        "code": "ROUTE_NOT_FOUND",
        "message": "Ruta no encontrada"
}

## Logging y monitoreo básico

ShipNow utiliza Winston para centralizar el registro de eventos, errores y mensajes relevantes de la aplicación.

El logger se integra con:

- el inicio del servidor 
- la conexión a MongoDB 
- el servicio de carga de datos mock  
- el middleware global de errores.
- Carga exitosa de documentos de usuarios.
- Asociación exitosa de comprobantes a pedidos.

## Niveles de logging

Se utilizan seis niveles personalizados:

Nivel                  Uso

debug         Información detallada para depuración

http          Información relacionada con solicitudes HTTP

info          Eventos informativos, como el inicio del servidor

warning       Situaciones inesperadas o datos inválidos

error         Errores que requieren atención

fatal         Fallas críticas que pueden impedir el funcionamiento

## Comportamiento según el entorno

El logger distingue entre desarrollo y producción mediante la variable NODE_ENV.

- Desarrollo (development): la consola muestra los niveles desde debug.
- Producción (production): la consola muestra los niveles desde info.
- Testing (test): utiliza info como nivel predeterminado.

La variable LOG_LEVEL permite configurar el nivel mínimo de logging.

Los registros se guardan en archivos mediante Winston y Winston-Daily-Rotate-File.

## Archivos de logs

Los registros se guardan automáticamente en la carpeta logs/, ubicada en la raíz del proyecto.

## Endpoint de prueba del logger

Para comprobar los niveles de logging se dispone de un endpoint de prueba:

GET /api/logger/test

La ruta ejecuta registros de prueba de los seis niveles.

Si la solicitud se procesa correctamente, devuelve una respuesta similar a:

{
        "status": "success",
        "message": "Se registraron pruebas de todos los niveles de logging"
}

Este endpoint está disponible únicamente fuera del entorno de producción.

## Integracion con el middleware global

El middleware global registra información sobre los errores recibidos y el endpoint que los originó.

- Los errores de validación y otros errores del cliente se registran como warning.
- Los errores internos se registran como error.
- Las fallas críticas durante el inicio o la conexión con MongoDB se registran como fatal.

El cliente continúa recibiendo una respuesta JSON uniforme sin exponer detalles técnicos internos que no necesita conocer.

## Constantes

Los roles y estados se encuentran centralizados en:

```text
src/constants/index.js
```

Roles disponibles:

```text
ADMIN
USER
DRIVER
```

Estados de productos:

```text
AVAILABLE
OUT_OF_STOCK
```

Estados de pedidos

```text
PENDING
CONFIRMED
IN_TRANSIT
DELIVERED
CANCELLED
```

Prioridades de pedidos

```text
LOW
MEDIUM
HIGH
```

Estados de entregas

```text
PENDING
ASSIGNED
IN_TRANSIT
DELIVERED
```

Centralizar estos valores permite evitar strings repetidos directamente en la lógica de la aplicación y mantiene la información coherente entre los diferentes módulos.

## Flujo de una petición

Ejemplo para crear un producto:

```text
POST /api/products
        ↓
Product Controller
        ↓
Product Service
        ↓
Product Repository
        ↓
MongoDB
```

Flujo de generación de datos mock

Para generar datos sin guardarlos:

GET /api/mocks/users
        ↓
Mock Controller
        ↓
Mock Service
        ↓
Mock Generator
        ↓
Respuesta HTTP

Para cargar datos de prueba:

POST /api/mocks/seed
        ↓
Mock Controller
        ↓
Mock Service
        ↓
Mock Repository
        ↓
MongoDB

Flujo de carga de archivos

Para cargar un dicumento de usuario:

POST /api/users/:id/documents
        ↓
Multer
        ↓
User Controller
        ↓
User Service
        ↓
User Repository
        ↓
MongoDB

El archivo se almacena en el sistema de archivos y su metadata se asocia al usuario en MongoDB.

## Testing

El proyecto utiliza Mocha, Chai y Supertest para realizar pruebas funcionales de los endpoints de la API.

### Herramientas utilizadas

- **Mocha:** ejecución y organización de las pruebas.
- **Chai:** validación de respuestas y resultados.
- **Supertest:** realización de solicitudes HTTP a la aplicación.
- **Cross-env:** configuración de variables de entorno para testing.

### Ejecutar las pruebas

Para ejecutar todas las pruebas funcionales:

```bash
npm test
```

### Entorno de testing

Las pruebas utilizan una base de datos independiente para evitar modificar los datos del entorno de desarrollo.

Archivo de configuración: `.env.test`

Variables necesarias:

```env
NODE_ENV=test
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/shipnow_test
```

Es necesario tener MongoDB instalado y en ejecución.

La configuración de testing verifica que la conexión corresponda a la base de datos `shipnow_test`. 

Al finalizar las pruebas, se eliminan los datos generados y se cierra la conexión.

### Módulos cubiertos

Las pruebas funcionales verifican:

- **Usuarios:** creación, listado, búsqueda por ID, validación de datos obligatorios y correos duplicados.
- **Productos:** creación, listado y búsqueda por ID, incluyendo validaciones.
- **Pedidos:** creación, listado, búsqueda por ID y validaciones de usuario y productos.
- **Mocks:** generación de usuarios, conductores, pedidos y entregas; validación de cantidades y carga de datos de prueba.
- **Logger:** funcionamiento del endpoint de prueba de logging.
- **Swagger:** disponibilidad de la documentación de la API.
- **Manejo de errores:** respuestas para recursos inexistentes y rutas no encontradas.
- **Carga de Documentos:** carga exitosa, archivo obligatorio, tipo de documento, tipo de archivo y usuario inexistente.
- **Carga de comprobantes:** carga exitosa, archivo obligatorio y pedido inexistente.
- **Validaciones de Multer:** tipo de archivo no permitido, tamaño máximo y nombre de campo incorrecto.

### Organización de las pruebas

Las pruebas se encuentran dentro de la carpeta `tests/`, organizadas por módulo y recurso.

La carpeta tests/users/ también contiene archivos de prueba utilizados para verificar la carga de documentos y las validaciones de archivos.

### Resultado de las pruebas

Actualmente, el proyecto cuenta con 40 pruebas funcionales aprobadas.

Las pruebas contemplan tanto casos exitosos como situaciones de error esperadas, verificando el comportamiento de los endpoints y el manejo centralizado de errores.

Para ejecutar nuevamente la suite: npm test

### Configuración para producción

ShipNow contempla diferentes comportamientos según el entorno configurado mediante NODE_ENV.

Los entornos admitidos son:

- development
- test
- production

En producción se mantienen disponibles los endpoints principales de la API y el health check.

Por razones de seguridad, las siguientes rutas se deshabilitan cuando NODE_ENV=production:

Ruta              Función

/api/mocks    Generación de datos simulados y seed

/api/logger     Pruebas de niveles de logging

/api/docs          Documentación Swagger

Cuando se intenta acceder a estas rutas en producción, la aplicación devuelve un error HTTP 404 con código ROUTE_NOT_FOUND.

Los endpoints de usuarios, productos y pedidos permanecen disponibles.

## Docker

ShipNow incorpora Docker para facilitar la construcción y ejecución de la API en un contenedor independiente.

Requisitos previos

- Docker Desktop o Docker Engine.
- MongoDB accesible desde el contenedor.

# Construir la imagen

Desde la carpeta raíz del proyecto, ejecutar:

docker build -t shipnow-api .

Este comando construye una imagen llamada shipnow-api.

# Ejecutar el contenedor

Si MongoDB se encuentra instalado y ejecutándose en la máquina Windows anfitriona, se puede utilizar host.docker.internal para permitir la conexión desde el contenedor.

Ejecutar:

docker run -d --name shipnow-container -p 3000:3000 -e NODE_ENV=production -e PORT=3000 -e MONGODB_URI="mongodb://host.docker.internal:27017/shipnow" -e LOG_LEVEL=info shipnow-api

Las variables de entorno se proporcionan externamente al contenedor.

# Verificar el contenedor

Para comprobar que el contenedor se encuentra en ejecución:

docker ps

Para consultar los registros:

docker logs shipnow-container

# Comprobar el funcionamiento de la API

Una vez iniciado el contenedor, abrir:

http://localhost:3000/health

También se puede comprobar el acceso a los productos:

http://localhost:3000/api/products

# Detener el contenedor

Para detener la aplicación:

docker stop shipnow-container

Para eliminar el contenedor detenido:

docker rm shipnow-container

La imagen permanece disponible aunque se elimine el contenedor.

# Archivos excluidos de Docker

El archivo .dockerignore evita incorporar a la imagen:

- node_modules/
- .env
- .env.test
- .git/
- logs/
- uploads/
- Archivos temporales y de cobertura.

Las variables de entorno se configuran al ejecutar el contenedor y no se incorporan a la imagen.

Los archivos generados durante la ejecución del contenedor, como uploads y logs, no tienen persistencia configurada por defecto. Para conservarlos al recrear el contenedor, es necesario configurar volúmenes de Docker.

# Seguridad y buenas prácticas

El proyecto contempla las siguientes medidas:

- Separación de entornos de desarrollo, testing y producción.
- Uso de variables de entorno para información de configuración.
- Exclusión de archivos sensibles mediante .gitignore y .dockerignore.
- Validación de variables de entorno al iniciar la aplicación.
- Límite de tamaño y tipos permitidos en la carga de archivos.
- Límite de cantidad de registros generados mediante mocks.
- Paginación para consultas de usuarios y pedidos.
- Deshabilitación de herramientas de desarrollo en producción.
- Manejo centralizado de errores.
- Separación de responsabilidades mediante arquitectura por capas.

### Autor

Proyecto desarrollado como parte de la formación en desarrollo Backend, utilizando Node.js, Express, MongoDB y herramientas de testing y escalabilidad.