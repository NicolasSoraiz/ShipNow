const env = require("./config/env.config");
const connectDB = require("./config/database");
const app = require("./app");

const startServer = async () => {
    await connectDB();

    app.listen(env.port, () => {
        console.log(`Servidor escuchando en el puerto ${env.port}`);
    });
};

startServer();