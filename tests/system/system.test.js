const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");

describe("Pruebas funcionales - Sistema", function () {

    describe("GET /api/logger/test", function () {
        it("Debe ejecutar las pruebas de logging correctamente", async function () {
            const response = await request(app).get("/api/logger/test");

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("status", "success");
            expect(response.body).to.have.property("message");
        });
    });

    describe("GET /api/docs", function () {
        it("Debe mostrar la documentación Swagger", async function () {
            const response = await request(app).get("/api/docs/");

            expect(response.status).to.equal(200);
            expect(response.headers["content-type"]).to.include("text/html");
        });
    });

    describe("Rutas inexistentes", function () {
        it("Debe devolver un error 404 con el formato estándar", async function () {
            const response = await request(app).get("/api/ruta-inexistente");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "ROUTE_NOT_FOUND");
            expect(response.body).to.have.property("message");
        });
    });

});