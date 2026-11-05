const mongoose = require("mongoose");
const connectDB = require("../src/config/database");

let connectedToTestDB = false;

exports.mochaHooks = {
    beforeAll: async function () {
        await connectDB();

        if (
            process.env.NODE_ENV !== "test" ||
            mongoose.connection.name !== "shipnow_test"
        ) {
            throw new Error(
                "ERROR: Los tests deben ejecutarse exclusivamente en shipnow_test"
            );
        }

        connectedToTestDB = true;
        console.log("Base de datos de testing conectada correctamente");
    },

    afterAll: async function () {
        if (connectedToTestDB) {
            await mongoose.connection.dropDatabase();
            await mongoose.disconnect();

            console.log("Base de datos de testing limpiada y conexión cerrada");
        }
    }
};