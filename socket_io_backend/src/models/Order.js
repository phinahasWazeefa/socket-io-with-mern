const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    otp: {
        type: Schema.Types.String,
        required: true
    },
    scheduledDate: {
        type: Schema.Types.Date,
        required: true,
    },
    service: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Service',
    },
    paymentAttributes: {
        type: Schema.Types.Array,
        required: true,
    },
    rateSplitUp: {
    },
    status: {
        type: Schema.Types.String,
        required: true,
        default: 'booked',// pending, completed, cancelled,
    },
    orderedDate: {
        type: Schema.Types.Date,
        required: true,
    }
});

module.exports = mongoose.model("Order", orderSchema);


