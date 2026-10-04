const express = require("express");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const mockRoutes = require("./routes/mock.routes");
const errorMiddleware = require("./middlewares/error.middlewares");
const CustomError = require("./errors/custom.error");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mocks", mockRoutes);

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