# ShipNow API

API desarrollada con Node.js, Express y MongoDB para la gestión de usuarios y productos.

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
* Llamar al Service correspondiente.
* Devolver la respuesta HTTP.

El Controller no contiene consultas directas a MongoDB.

### Service

Contiene la lógica de negocio de la aplicación.

Por ejemplo:

* Definir valores por defecto.
* Aplicar reglas de negocio.
* Procesar los datos antes de enviarlos al Repository.

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
│   └── user.controller.js
│
├── models/
│   ├── Product.js
│   └── User.js
│
├── repositories/
│   ├── product.repository.js
│   └── user.repository.js
│
├── routes/
│   ├── product.routes.js
│   └── user.routes.js
│
├── services/
│   ├── product.service.js
│   └── user.service.js
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

## Constantes

Los roles y estados se encuentran centralizados en:

```text
src/constants/index.js
```

Roles disponibles:

```text
ADMIN
USER
```

Estados de productos:

```text
AVAILABLE
OUT_OF_STOCK
```

Esto evita utilizar valores repetidos directamente en la lógica de la aplicación.

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

Cada capa tiene una responsabilidad específica, evitando mezclar lógica HTTP, lógica de negocio y acceso a datos.


