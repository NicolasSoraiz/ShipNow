# ShipNow API

API desarrollada con Node.js, Express y MongoDB para la gestión de usuarios, productos, pedidos y entregas. El proyecto incorpora generacion de datos simulados, carga de datos de prueba, manejo centralizado de errores, un sistema de logging con Winston y documentación interactiva mediante Swagger.

La aplicación utiliza una arquitectura por capas para separar las responsabilidades y facilitar el mantenimiento y la escalabilidad del código.

## Tecnologías

* Node.js
* Express
* MongoDB
* Mongoose
* dotenv
* Winston
* Winston-Daily-rotate-file
* swagger-jsdoc
* swagger-ui-express

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

Por ejemplo, los usuarios reciben el rol USER por defecto y los productos utilizan el estado AVAILABLE cuando corresponde.

### Repository

Se encarga del acceso a los datos mediante Mongoose.

Entre las operaciones utilizadas se encuentran:

```js
User.find(...)
User.findById(...)
User.create(...)
```

y para los productos:

```js
Product.find(...)
Product.findById(...)
Product.create(...)
```

para el sistema mocking tambíen se encarga de insertar los datos generados:

Para la carga de datos de prueba también utiliza operaciones de inserción de usuarios, repartidores, productos, pedidos y entregas.

De esta forma, el Service no necesita conocer cómo se realizan las consultas a MongoDB.

## Estructura del proyecto

```text
src/
├── config/
│   ├── database.js
│   ├── env.config.js
|   ├── logger.js
|   ├── swagger.js
|   └── swagger/
|       └── schemas.js
│
├── constants/
│   └── index.js
│
├── controllers/
│   ├── product.controller.js
│   |── user.controller.js
|   |── mock.controller.js
|   └── logger.controller.js
|   
├── errors/
|   ├── custom.error.js
|   ├── error.dictionary.js
|
├── middlewares/
|   ├── error.middleware.js
│
├── models/
│   ├── Product.js
│   |── User.js
|   |── Order.js
|   └── Delivery.js
|
├── mock/
|   ├── user.mock.js
|   ├── driver.mock.js
|   ├── order.mock.js
|   └── delivery.mock.js
│
├── repositories/
│   ├── product.repository.js
│   |── user.repository.js
|   └── mock.repository.js
│
├── routes/
│   ├── product.routes.js
│   |── user.routes.js
|   |── mock.routes.js
|   └── logger.routes.js
│
├── services/
│   ├── product.service.js
│   |── user.service.js
|   └── mock.service.js
│
├── app.js
└── server.js
```

La carpeta logs/ se genera cuando Winston comienza a guardar registros. Los archivos de logs no deben subirse al repositorio.

## Instalación

Clonar el repositorio y acceder a la carpeta del proyecto.

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
```

El archivo .env contiene la configuración local de la aplicación y no debe subirse al repositorio.

Las variables de entorno se validan al iniciar la aplicación. Si falta una variable requerida o su configuración es inválida, el servidor no debería iniciar correctamente.

## Ejecución

Para iniciar la aplicación:

```bash
npm start
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

La aplicación requiere que MongoDB esté ejecutándose localmente.

## Documentación de la API con Swagger

ShipNow utiliza Swagger para documentar y explorar los endpoints de su API REST.

### Acceso a Swagger UI

Con el servidor iniciado, abrir:

http://localhost:3000/api/docs

Desde esta interfaz se pueden consultar los endpoints documentados, sus parámetros, los cuerpos de las solicitudes y las respuestas previstas.

### Cómo iniciar el servidor

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Configurar las variables de entorno en el archivo `.env`.

3. Verificar que MongoDB esté funcionando.

4. Iniciar la aplicación:

   ```bash
   npm start
   ```

5. Abrir en el navegador:

   http://localhost:3000/api/docs

### Organización de la documentación

La configuración de Swagger se encuentra separada de las rutas de la aplicación:

- `src/config/swagger.js`: configuración general de OpenAPI, información de la API, servidor y etiquetas.
- `src/config/swagger/schemas.js`: schemas reutilizables para las respuestas y los modelos documentados.
- `src/routes/`: rutas y anotaciones Swagger correspondientes a las operaciones de la API.

### Módulos documentados

- **Users:** consulta, búsqueda por ID y creación de usuarios.
- **Products:** consulta, búsqueda por ID y creación de productos.
- **Mocks:** generación de usuarios, conductores, pedidos y entregas simulados, y carga de datos de prueba.
- **Logger:** endpoint de prueba para verificar los niveles de logging.

Los schemas de `Order` y `Delivery` describen la estructura de esas entidades. No implican que existan endpoints independientes para administrar pedidos y entregas.

### Schemas reutilizables

La documentación incluye los siguientes schemas:

- `User`: estructura del usuario.
- `OrderItem`: producto y cantidad dentro de un pedido.
- `Order`: estructura del pedido.
- `Delivery`: estructura de la entrega.
- `ErrorResponse`: formato uniforme de errores.
- `SuccessResponse`: formato genérico de respuesta exitosa.

### Pruebas de la documentación

Abrir Swagger UI y verificar que las operaciones documentadas aparezcan agrupadas por etiquetas. Se puede desplegar cada operación para consultar sus parámetros, cuerpos de solicitud y respuestas documentadas.

Las pruebas de los endpoints deben realizarse con una base de datos disponible y datos válidos cuando corresponda.

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

Si no se especifica un rol, el usuario se crea con el rol `USER`.

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

Ejemplo:

[
        {
        "name": "Ana Pérez",
        "email": "ana.pérez.12345@test.com",
        "role": "USER"
        },
        {
        "name": "Luis Gómez",
        "email": "luis.gómez.67890@test.com",
        "role": "USER"
        }
]

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

Genera entregas simuladas asociadas a:

* Un pedido.
* Un repartidor.
* Un estado de entrega.

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

Por ejemplo:

Usuario
   ↓
Pedido
   ↓
Entrega
   ↓
Repartidor

A diferencia de los endpoints GET de mocking, el endpoint POST /api/mocks/seed sí persiste los datos en MongoDB.

Ejemplo:

Respuesta esperada:

{
        "message": "Datos de prueba cargados correctamente",
        "cantidad": 2,
        "data": {
        "users": [],
        "drivers": [],
        "products": [],
        "orders": [],
        "deliveries": []
        }
}

Los arrays contienen los registros realmente creados en MongoDB.

## Validación del parámetro qty

Los endpoints de mocking validan que qty sea un número entero mayor que cero.

Por ejemplo:

```http
GET /api/mocks/users?qty=-2
```

devuelve un error 400 Bad Request con el formato general de errores:

{
        "status": "error",
        "code": "INVALID_MOCK_QUANTITY",
        "message": "qty debe ser un número entero mayor que 0"
}

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

## Logging y monitoreo básico

ShipNow utiliza Winston para centralizar el registro de eventos, errores y mensajes relevantes de la aplicación.

El logger se integra con el inicio del servidor, la conexión a MongoDB, el servicio de carga de datos mock y el middleware global de errores.

## Niveles de logging

Se utilizan seis niveles personalizados:

Nivel                  Uso

debug         Información detallada para depuración

http          Información relacionada con solicitudes HTTP

info          Eventos informativos, como el inicio del servidor

warning       Situaciones inesperadas o datos inválidos

error         Errores que requieren atención

fatal         Fallas críticas que pueden impedir el funcionamiento de la aplicación

## Comportamiento según el entorno

El logger distingue entre desarrollo y producción mediante la variable NODE_ENV.

- Desarrollo (development): la consola muestra los niveles desde debug.
- Producción: la consola muestra los niveles desde info.
- Archivos: el archivo general conserva los registros desde debug, mientras que el archivo de errores conserva únicamente los niveles error y fatal.
        * general conserva los registros desde debug, mientras que el archivo de errores conserva únicamente los niveles error y fatal.

Los registros incluyen fecha, nivel y mensaje. Cuando se registra un objeto de error compatible, también puede incluirse su stack trace.

## Archivos de logs

Los registros se guardan automáticamente en la carpeta logs/, ubicada en la raíz del proyecto.

## Endpoint de prueba del logger

Para comprobar los niveles de logging se dispone de un endpoint de prueba:

GET /api/logger/test

La ruta ejecuta registros de prueba de los seis niveles:

- debug
- http
- info
- warning
- error
- fatal

Si la solicitud se procesa correctamente, devuelve una respuesta similar a:

{
        "status": "success",
        "message": "Se registraron pruebas de todos los niveles de logging"
}

Este endpoint permite verificar que Winston genere los mensajes correspondientes en la consola y en los archivos de registro. Los mensajes error y fatal también deben aparecer en el archivo exclusivo de errores.

## Integracion con el middleware global

El middleware global registra información sobre los errores recibidos y el endpoint que los originó.

- Los errores de validación y otros errores del cliente se registran como warning.
- Los errores internos se registran como error.
- Las fallas críticas durante el inicio o la conexión con MongoDB se registran como fatal.

El cliente continúa recibiendo una respuesta JSON uniforme sin exponer detalles técnicos internos que no necesita conocer.

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

## Errores de Mongoose

El middleware también transforma determinados errores de Mongoose en respuestas uniformes.

Se manejan: 

- ValidationError: datos que no cumplen las validaciones del modelo.
- CastError: identificadores o datos con formato inválido.
- E11000: intento de insertar un dato duplicado.

Estos errores se responden como:

{
        "status": "error",
        "code": "INVALID_DATA",
        "message": "Los datos enviados no son válidos"
}

Ruta inexistente

Las rutas que no existen también utilizan el sistema centralizado de errores.

Por ejemplo:

GET /api/esto-no-existe

devuelve:

{
        "status": "error",
        "code": "ROUTE_NOT_FOUND",
        "message": "Ruta no encontrada"
}

con HTTP 404

Pruebas de errores

Usuario inexistente

GET /api/users/000000000000000000000000

respuesta:

{
        "status": "error",
        "code": "USER_NOT_FOUND",
        "message": "Usuario no encontrado"
}

Producto inexistente

GET /api/products/000000000000000000000000

respuesta:

{
        "status": "error",
        "code": "PRODUCT_NOT_FOUND",
        "message": "Producto no encontrado"
}

ID inválido

GET /api/users/123

respuesta:

{
        "status": "error",
        "code": "INVALID_DATA",
        "message": "Los datos enviados no son válidos"
}

Cantidad de mocks inválida

GET /api/mocks/users?qty=-5

respuesta:

{
        "status": "error",
        "code": "INVALID_MOCK_QUANTITY",
        "message": "La cantidad de mocks debe ser un número entero mayor que 0"
}

Error durante el seed

Si MongoDB no está disponible y se ejecuta:

POST /api/mocks/seed?qty=2

el error se transforma en:

{
        "status": "error",
        "code": "MOCK_SEED_ERROR",
        "message": "No se pudieron cargar los datos de prueba"
}

Datos duplicados

Si se intenta crear un usuario utilizando un email que ya existe, MongoDB genera un error E11000.

El middleware lo transforma en:

{
        "status": "error",
        "code": "INVALID_DATA",
        "message": "Los datos enviados no son válidos"
}

De esta forma, los errores no se manejan directamente en las rutas y las respuestas mantienen un formato consistente en toda la API.

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

Cada capa tiene una responsabilidad específica, evitando mezclar lógica HTTP, lógica de negocio y acceso a datos.

Flujo de manejo de errores

Cuando ocurre un error:

Petición HTTP
        ↓
Controller
        ↓
Service
        ↓
CustomError / Error de Mongoose
        ↓
Error Middleware
        ↓
Respuesta HTTP uniforme

Cada capa tiene una responsabilidad específica, evitando mezclar lógica HTTP, lógica de negocio, acceso a datos y manejo de errores.