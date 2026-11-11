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
    },

    FILE_REQUIRED: {
        message: "Debe enviar un archivo",
        statusCode: 400
    },

    INVALID_FILE_TYPE: {
        message: "El tipo de archivo no está permitido. Formatos aceptados: PDF, JPG y PNG",
        statusCode: 400
    },

    FILE_TOO_LARGE: {
        message: "El archivo supera el tamaño máximo permitido de 5 MB",
        statusCode: 400
    },

    INVALID_DOCUMENT_TYPE: {
        message: "El tipo de documento no es válido. Valores permitidos: DNI, LICENSE y OTHER",
        statusCode: 400
    },

    FILE_UPLOAD_ERROR: {
        message: "No se pudo guardar el archivo",
        statusCode: 500
    }
});

module.exports = ERROR_DICTIONARY;