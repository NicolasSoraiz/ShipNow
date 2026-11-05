const { expect } = require("chai");
const request = require("supertest");
const app = require("../../src/app");

describe("Pruebas funcionales - Pedidos", function () {
    let userId;
    let productId;
    let orderId;

    const userData = {
        name: "Usuario para pedidos",
        email: "usuario.pedidos@shipnow.com"
    };

    const productData = {
        name: "Producto para pedidos",
        description: "Producto de prueba para pedidos",
        price: 1500,
        stock: 20
    };

    before(async function () {
        const userResponse = await request(app)
            .post("/api/users")
            .send(userData);

        expect(userResponse.status).to.equal(201);
        userId = userResponse.body._id;

        const productResponse = await request(app)
            .post("/api/products")
            .send(productData);

        expect(productResponse.status).to.equal(201);
        productId = productResponse.body._id;
    });

    describe("POST /api/orders", function () {
        it("Debe crear un pedido correctamente", async function () {
            const response = await request(app)
                .post("/api/orders")
                .send({
                    user: userId,
                    items: [
                        {
                            product: productId,
                            quantity: 2
                        }
                    ]
                });

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property("_id");
            expect(response.body.user).to.equal(userId);
            expect(response.body.total).to.equal(3000);
            expect(response.body.status).to.equal("PENDING");
            expect(response.body.priority).to.equal("MEDIUM");

            orderId = response.body._id;
        });

        it("Debe rechazar un pedido sin productos", async function () {
            const response = await request(app)
                .post("/api/orders")
                .send({
                    user: userId,
                    items: []
                });

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code");
            expect(response.body).to.have.property("message");
        });

        it("Debe rechazar un pedido con un usuario inexistente", async function () {
            const response = await request(app)
                .post("/api/orders")
                .send({
                    user: "671a8b2c3d4e5f60718293a4",
                    items: [
                        {
                            product: productId,
                            quantity: 1
                        }
                    ]
                });

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "USER_NOT_FOUND");
        });
    });

    describe("GET /api/orders", function () {
        it("Debe obtener la lista de pedidos", async function () {
            const response = await request(app).get("/api/orders");

            expect(response.status).to.equal(200);
            expect(response.body).to.be.an("array");
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    describe("GET /api/orders/:id", function () {
        it("Debe obtener un pedido por su ID", async function () {
            const response = await request(app)
                .get(`/api/orders/${orderId}`);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("_id", orderId);
            expect(response.body.total).to.equal(3000);
        });

        it("Debe devolver un error cuando el pedido no existe", async function () {
            const response = await request(app)
                .get("/api/orders/671a8b2c3d4e5f60718293a4");

            expect(response.status).to.equal(404);
            expect(response.body).to.have.property("status", "error");
            expect(response.body).to.have.property("code", "ORDER_NOT_FOUND");
            expect(response.body).to.have.property("message");
        });
    });
});