# ShipNow API

API desarrollada con Node.js, Express y MongoDB para la gestión de usuarios y productos, incorporando un sistema de mocking y carga de datos de prueba.

El proyecto utiliza una arquitectura de tres capas para separar las responsabilidades de cada parte de la aplicación.

## Tecnologías

* Node.js
* Express
* MongoDB
* Mongoose
* dotenv

## Arquitectura

El proyecto utiliza una arquitectura de tres capas:

```text
Controller → Service → Repository → Database
```

### Controller

Es el punto de entrada de las peticiones HTTP.

Se encarga de:

* Recibir las solicitudes.
* Obtener parámetros y datos del request.
* Validar los datos recibidos.
* Llamar al Service correspondiente.
* Devolver la respuesta HTTP.

El Controller no contiene consultas directas a MongoDB ni utiliza mongoose para acceder a la base de datos.

### Service

Contiene la lógica de negocio de la aplicación.

Por ejemplo:

* Aplicar reglas de negocio.
* Definir valores por defecto.
* Procesar los datos antes de enviarlos al Repository.
* Coordinar la generación de datos mock.
* Coordinar la carga de datos de prueba.


En este proyecto, el Service asigna el rol `USER` por defecto al crear un usuario y establece el estado `AVAILABLE` al crear un producto.

### Repository

Se encarga exclusivamente del acceso a los datos.

Es la capa que conoce las consultas realizadas mediante Mongoose, como:

```js
User.find(...)
User.findById(...)
User.create(...)
```

y:

```js
Product.find(...)
Product.findById(...)
Product.create(...)
```

para el sistema mocking tambíen se encarga de insertar los datos generados:

```js
User.insertMany(...)
Product.insertMany(...)
Order.insertMany(...)
Delivery.insertMany(...)
```

De esta forma, el Service no necesita conocer cómo se realizan las consultas a MongoDB.

## Estructura del proyecto

```text
src/
├── config/
│   ├── database.js
│   └── env.config.js
│
├── constants/
│   └── index.js
│
├── controllers/
│   ├── product.controller.js
│   |── user.controller.js
|   └── mock.controller.js
│
├── models/
│   ├── Product.js
│   |── User.js
|   |── Order.js
|   └── Delivery.js
│
├── repositories/
│   ├── product.repository.js
│   |── user.repository.js
|   └── mock.repository.js
│
├── routes/
│   ├── product.routes.js
│   |── user.routes.js
|   └── mock.routes.js
│
├── services/
│   ├── product.service.js
│   |── user.service.js
|   └── mock.service.js
│
├── app.js
└── server.js
```

## Instalación

Clonar el repositorio y entrar en la carpeta del proyecto.

Instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Se puede utilizar `.env.example` como referencia.

Ejemplo:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
```

El archivo `.env` no debe subirse al repositorio.

Las variables de entorno son validadas al iniciar la aplicación. Si falta una variable requerida, la aplicación muestra un error y no inicia.

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

## Mocking

El proyecto incorpora un sistema de generación de datos simulados para realizar pruebas sin tener que ingresar manualmente todos los registros.

Los endpoints de mocking se encuentran agrupados bajo:

```http
/api/mocks
```

Los datos generados mediante los endpoints GET son simulados y no se guardan en MongoDB.

Generar usuarios

```http
GET /api/mocks/users?qty=2
```

Genera la cantidad de usuarios indicada mediante qty.

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

Validación del parámetro qty

Los endpoints de mocking validan el parámetro qty.

Debe ser un número entero mayor que 0.

Por ejemplo:

```http
GET /api/mocks/users?qty=-2
```

devuelve un error 400 Bad Request:

{
  "message": "qty debe ser un número entero mayor que 0"
}

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


