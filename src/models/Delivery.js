const mongoose = require("mongoose");
const { DELIVERY_STATUS } = require("../constants");

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

const deliverySchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: Object.values(DELIVERY_STATUS),
            default: DELIVERY_STATUS.PENDING
        },

        deliveredAt: {
            type: Date,
            default: null
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

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;