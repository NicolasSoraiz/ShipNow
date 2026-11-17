const express = require("express");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const mockRoutes = require("./routes/mock.routes");
const loggerRoutes = require("./routes/logger.routes");
const errorMiddleware = require("./middlewares/error.middlewares");
const CustomError = require("./errors/custom.error");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const orderRoutes = require("./routes/order.routes");


const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "ShipNow API funcionando correctamente",
        environment: process.env.NODE_ENV,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
if (process.env.NODE_ENV !== "production") {
    app.use("/api/mocks", mockRoutes);
}
if (process.env.NODE_ENV !== "production") {
    app.use("/api/logger", loggerRoutes);
}
if (process.env.NODE_ENV !== "production") {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use((req, res, next) => {
    const error = new CustomError(
        "Ruta no encontrada",
        "ROUTE_NOT_FOUND",
        404
    );

    next(error);
});

app.use(errorMiddleware);

module.exports = app;