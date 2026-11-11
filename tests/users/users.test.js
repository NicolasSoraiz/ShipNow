const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");
const path = require("path");

describe("Pruebas funcionales - Usuarios", function () {

    let userId;

    const userData = {
        name: "Usuario de prueba",
        email: "usuario.test@shipnow.com"
    };

    const testFile = path.join(__dirname, "document-test.png");

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

    describe("POST /api/users/:id/documents", function () {

        it("Debe cargar un documento correctamente", async function () {
            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .attach("document", testFile)
                .field("documentType", "DNI");

            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal("success");
            expect(response.body.user.documents).to.be.an("array");
            expect(response.body.user.documents.length).to.be.greaterThan(0);

            const document = response.body.user.documents[
                response.body.user.documents.length - 1
            ];

            expect(document.documentType).to.equal("DNI");
            expect(document.mimetype).to.equal("image/png");
            expect(document).to.have.property("filename");
            expect(document).to.have.property("path");
        });

        it("Debe rechazar la carga cuando no se envía un archivo", async function () {
            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .field("documentType", "DNI");

            expect(response.status).to.equal(400);
            expect(response.body.code).to.equal("FILE_REQUIRED");
        });

        it("Debe rechazar un tipo de documento inválido", async function () {
            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .attach("document", testFile)
                .field("documentType", "PASSPORT");

            expect(response.status).to.equal(400);
            expect(response.body.code).to.equal("INVALID_DOCUMENT_TYPE");
        });

        it("Debe rechazar la carga para un usuario inexistente", async function () {
            const response = await request(app)
                .post("/api/users/671a8b2c3d4e5f60718293a4/documents")
                .attach("document", testFile)
                .field("documentType", "DNI");

            expect(response.status).to.equal(404);
            expect(response.body.code).to.equal("USER_NOT_FOUND");
        });

        it("Debe rechazar archivos con formatos no permitidos", async function () {
            const invalidFile = path.join(
                __dirname,
                "invalid-document.txt"
            );

            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .attach("document", invalidFile)
                .field("documentType", "DNI");

            expect(response.status).to.equal(400);
            expect(response.body.status).to.equal("error");
            expect(response.body.code).to.equal("INVALID_FILE_TYPE");
        });

        it("Debe rechazar archivos que superen los 5 MB", async function () {
            const largeFile = path.join(
                __dirname,
                "large-document.png"
            );

            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .attach("document", largeFile)
                .field("documentType", "DNI");

            expect(response.status).to.equal(400);
            expect(response.body.status).to.equal("error");
            expect(response.body.code).to.equal("FILE_TOO_LARGE");
        });

        it("Debe rechazar archivos enviados con un nombre de campo incorrecto", async function () {
            const response = await request(app)
                .post(`/api/users/${userId}/documents`)
                .attach("archivo", path.join(__dirname, "document-test.png"))
                .field("documentType", "DNI");

            expect(response.status).to.equal(400);
            expect(response.body.status).to.equal("error");
            expect(response.body.code).to.equal("INVALID_DATA");
        });
    });
});