const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: false,
    // ref: "suppliers",
  },
  itemName: { type: String, required: false, trim: true },
  itemImage: { type: String, required: false, trim: true },
  itemDescription: { type: String, required: false, trim: true },
  itemPrice: { type: String, required: false, trim: true },
  itemQuantity: { type: String, required: false, trim: true },
});

const Inventory = mongoose.model("inventories", InventorySchema);
module.exports = Inventory;
