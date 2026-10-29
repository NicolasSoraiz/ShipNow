const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ShipNow API",
            version: "1.0.0",
            description:
                "API REST para la gestión de usuarios, productos, pedidos y entregas. Incluye generación de datos simulados, carga de datos de prueba y herramientas de validación."
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local de desarrollo"
            }
        ],
        tags: [
            {
                name: "Users",
                description: "Gestión de usuarios"
            },
            {
                name: "Orders",
                description: "Gestión de pedidos"
            },
            {
                name: "Deliveries",
                description: "Gestión de entregas"
            },
            {
                name: "Mocks",
                description: "Generación y carga de datos de prueba"
            },
            {
                name: "Logger",
                description: "Herramientas de validación del sistema de logging"
            },
            {
                name: "Products", 
                description: "Gestion de productos"
            },
        ]
    },
    apis: ["./src/routes/*.js", "./src/config/swagger/**/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;