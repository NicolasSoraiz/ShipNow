const mongoose = require("mongoose");

const { PRODUCT_STATUS } = require("../constants");

const productSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    status: {
        type: String,
        enum: Object.values(PRODUCT_STATUS),
        default: PRODUCT_STATUS.AVAILABLE
    }
},
{
    timestamps: true
}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;