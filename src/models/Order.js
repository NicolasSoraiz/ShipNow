const mongoose = require("mongoose");

const {
    ORDER_STATUS,
    ORDER_PRIORITY
} = require("../constants");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],

    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.PENDING
    },

    priority: {
        type: String,
        enum: Object.values(ORDER_PRIORITY),
        default: ORDER_PRIORITY.MEDIUM
    },

    total: {
        type: Number,
        required: true,
        min: 0
    }
},
{
    timestamps: true
}
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;