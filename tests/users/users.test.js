const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");

describe("Pruebas funcionales - Usuarios", function () {

    let userId;

    const userData = {
        name: "Usuario de prueba",
        email: "usuario.test@shipnow.com"
    };

    describe("POST /api/users", function () {

        it("Debe crear un usuario correctamente", async function () {
            const response = await request(app)
                .post("/api/users")
                .send(userData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("_id");
            expect(response.body.name).to.equal(userData.name);
            expect(response.body.email).to.equal(userData.email);
            expect(response.body.role).to.equal("USER");

            userId = response.body._id;
        });

        it("Debe rechazar la creación de un usuario sin datos obligatorios", async function () {
            const response = await request(app)
                .post("/api/users")
                .send({});

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code");
            expect(response.body).to.have.property("message");
        });

        it("No debe permitir registrar un correo duplicado", async function () {
            const response = await request(app)
                .post("/api/users")
                .send(userData);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
        });

    });

    describe("GET /api/users", function () {

        it("Debe obtener la lista de usuarios", async function () {
            const response = await request(app)
                .get("/api/users");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.greaterThan(0);
        });

    });

    describe("GET /api/users/:id", function () {

        it("Debe obtener un usuario por su ID", async function () {
            const response = await request(app)
                .get(`/api/users/${userId}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("_id", userId);
            expect(response.body.email).to.equal(userData.email);
        });

        it("Debe devolver un error cuando el usuario no existe", async function () {
            const response = await request(app)
                .get("/api/users/671a8b2c3d4e5f60718293a4");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "USER_NOT_FOUND");
            expect(response.body).to.have.property("message");
        });

    });

});