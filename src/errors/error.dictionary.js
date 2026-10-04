const ERROR_DICTIONARY = Object.freeze({
    USER_NOT_FOUND: {
        message: "Usuario no encontrado",
        statusCode: 404
    },

    PRODUCT_NOT_FOUND: {
        message: "Producto no encontrado",
        statusCode: 404
    },

    ORDER_NOT_FOUND: {
        message: "Pedido no encontrado",
        statusCode: 404
    },

    DELIVERY_NOT_FOUND: {
        message: "Entrega no encontrada",
        statusCode: 404
    },

    INVALID_MOCK_QUANTITY: {
        message: "La cantidad de mocks debe ser un número entero mayor que 0",
        statusCode: 400
    },

    MOCK_SEED_ERROR: {
        message: "No se pudieron cargar los datos de prueba",
        statusCode: 500
    },

    INVALID_DATA: {
        message: "Los datos enviados no son válidos",
        statusCode: 400
    }
});

module.exports = ERROR_DICTIONARY;