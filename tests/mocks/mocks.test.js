const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");

describe("Pruebas funcionales - Mocks", function () {

    describe("GET /api/mocks/users", function () {
        it("Debe generar un usuario por defecto", async function () {
            const response = await request(app).get("/api/mocks/users");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array").with.lengthOf(1);
        });

        it("Debe generar la cantidad de usuarios solicitada", async function () {
            const response = await request(app)
                .get("/api/mocks/users?qty=3");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array").with.lengthOf(3);
        });
    });

    describe("GET /api/mocks/drivers", function () {
        it("Debe generar la cantidad de conductores solicitada", async function () {
            const response = await request(app)
                .get("/api/mocks/drivers?qty=2");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array").with.lengthOf(2);
        });
    });

    describe("GET /api/mocks/orders", function () {
        it("Debe generar la cantidad de pedidos solicitada", async function () {
            const response = await request(app)
                .get("/api/mocks/orders?qty=2");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array").with.lengthOf(2);
        });
    });

    describe("GET /api/mocks/deliveries", function () {
        it("Debe generar la cantidad de entregas solicitada", async function () {
            const response = await request(app)
                .get("/api/mocks/deliveries?qty=2");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array").with.lengthOf(2);
        });
    });

    describe("Validación de cantidades", function () {
        it("Debe rechazar una cantidad igual a cero", async function () {
            const response = await request(app)
                .get("/api/mocks/users?qty=0");

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "INVALID_MOCK_QUANTITY");
            expect(response.body).to.have.property("message");
        });

        it("Debe rechazar una cantidad no numérica", async function () {
            const response = await request(app)
                .get("/api/mocks/users?qty=abc");

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "INVALID_MOCK_QUANTITY");
        });

        it("Debe rechazar una cantidad decimal", async function () {
            const response = await request(app)
                .get("/api/mocks/users?qty=1.5");

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "INVALID_MOCK_QUANTITY");
        });
    });

    describe("POST /api/mocks/seed", function () {
        it("Debe cargar datos de prueba correctamente", async function () {
            const response = await request(app)
                .post("/api/mocks/seed?qty=2");

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property(
                "message",
                "Datos de prueba cargados correctamente"
            );
            expect(response.body).to.have.property("cantidad", 2);
            expect(response.body).to.have.property("data");
        });

        it("Debe rechazar una cantidad inválida al cargar datos", async function () {
            const response = await request(app)
                .post("/api/mocks/seed?qty=0");

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "INVALID_MOCK_QUANTITY");
        });
    });
});