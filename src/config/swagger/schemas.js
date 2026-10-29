/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Usuario registrado en ShipNow.
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador generado por MongoDB.
 *           example: 671a8b2c3d4e5f60718293a4
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico único, guardado en minúsculas.
 *           example: juan@example.com
 *         role:
 *           type: string
 *           description: Rol asignado al usuario.
 *           example: USER
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización.
 *       required:
 *         - _id
 *         - name
 *         - email
 *         - role
 *
 *     OrderItem:
 *       type: object
 *       description: Producto y cantidad incluidos en un pedido.
 *       properties:
 *         product:
 *           type: string
 *           description: Identificador del producto.
 *           example: 671a8b2c3d4e5f60718293a4
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Cantidad de unidades del producto.
 *           example: 2
 *       required:
 *         - product
 *         - quantity
 *
 *     Order:
 *       type: object
 *       description: Pedido registrado en ShipNow.
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador del pedido.
 *           example: 671a8b2c3d4e5f60718293a4
 *         user:
 *           type: string
 *           description: Identificador del usuario que realizó el pedido.
 *           example: 671a8b2c3d4e5f60718293a4
 *         items:
 *           type: array
 *           description: Productos incluidos en el pedido.
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         status:
 *           type: string
 *           description: Estado actual del pedido.
 *           example: PENDING
 *         priority:
 *           type: string
 *           description: Prioridad del pedido.
 *           example: MEDIUM
 *         total:
 *           type: number
 *           minimum: 0
 *           description: Importe total del pedido.
 *           example: 3000
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización.
 *       required:
 *         - _id
 *         - user
 *         - items
 *         - status
 *         - priority
 *         - total
 *
 *     Delivery:
 *       type: object
 *       description: Entrega asociada a un pedido y a un conductor.
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador de la entrega.
 *           example: 671a8b2c3d4e5f60718293a4
 *         order:
 *           type: string
 *           description: Identificador del pedido asociado.
 *           example: 671a8b2c3d4e5f60718293a4
 *         driver:
 *           type: string
 *           description: Identificador del usuario asignado como conductor.
 *           example: 671a8b2c3d4e5f60718293a4
 *         status:
 *           type: string
 *           description: Estado actual de la entrega.
 *           example: PENDING
 *         deliveredAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Fecha y hora de entrega; es null mientras no se haya entregado.
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización.
 *       required:
 *         - _id
 *         - order
 *         - driver
 *         - status
 *
 *     ErrorResponse:
 *       type: object
 *       description: Respuesta uniforme para errores de la API.
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         code:
 *           type: string
 *           example: USER_NOT_FOUND
 *         message:
 *           type: string
 *           example: Usuario no encontrado
 *       required:
 *         - status
 *         - code
 *         - message
 *
 *     SuccessResponse:
 *       type: object
 *       description: Respuesta exitosa genérica.
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         message:
 *           type: string
 *           example: Operación realizada correctamente
 */