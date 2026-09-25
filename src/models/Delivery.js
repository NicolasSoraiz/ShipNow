const mongoose = require("mongoose");

const { DELIVERY_STATUS } = require("../constants");

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
    }
},
{
    timestamps: true
}
);

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;