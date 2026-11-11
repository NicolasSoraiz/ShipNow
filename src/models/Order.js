const mongoose = require("mongoose");

const {
    ORDER_STATUS,
    ORDER_PRIORITY
} = require("../constants");

const receiptSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        mimetype: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    { _id: true }
);

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
        },

        receipts: {
            type: [receiptSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;