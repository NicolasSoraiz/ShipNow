const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");

describe("Pruebas funcionales - Productos", function () {

    let productId;

    const productData = {
        name: "Paquete de prueba",
        description: "Producto creado para testing",
        price: 1500,
        stock: 10
    };

    describe("POST /api/products", function () {

        it("Debe crear un producto correctamente", async function () {
            const response = await request(app)
                .post("/api/products")
                .send(productData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("_id");
            expect(response.body.name).to.equal(productData.name);
            expect(response.body.description).to.equal(productData.description);
            expect(response.body.price).to.equal(productData.price);
            expect(response.body.stock).to.equal(productData.stock);
            expect(response.body.status).to.equal("AVAILABLE");

            productId = response.body._id;
        });

        it("Debe rechazar la creación de un producto sin datos obligatorios", async function () {
            const response = await request(app)
                .post("/api/products")
                .send({});

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code");
            expect(response.body).to.have.property("message");
        });

    });

    describe("GET /api/products", function () {

        it("Debe obtener la lista de productos disponibles", async function () {
            const response = await request(app)
                .get("/api/products");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.greaterThan(0);

            response.body.forEach((product) => {
                expect(product.stock).to.be.greaterThan(0);
            });
        });

    });

    describe("GET /api/products/:id", function () {

        it("Debe obtener un producto por su ID", async function () {
            const response = await request(app)
                .get(`/api/products/${productId}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("_id", productId);
            expect(response.body.name).to.equal(productData.name);
        });

        it("Debe devolver un error cuando el producto no existe", async function () {
            const response = await request(app)
                .get("/api/products/671a8b2c3d4e5f60718293a4");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "PRODUCT_NOT_FOUND");
            expect(response.body).to.have.property("message");
        });

    });

});