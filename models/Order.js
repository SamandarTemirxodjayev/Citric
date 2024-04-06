const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 1,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;