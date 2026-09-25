const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Delivery = require("../models/Delivery");

class MockRepository {
    async createUsers(users) {
        return User.insertMany(users);
    }

    async createProducts(products) {
        return Product.insertMany(products);
    }

    async createOrders(orders) {
        return Order.insertMany(orders);
    }

    async createDeliveries(deliveries) {
        return Delivery.insertMany(deliveries);
    }
}

module.exports = new MockRepository();