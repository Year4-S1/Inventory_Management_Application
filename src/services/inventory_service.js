const Inventory = require("../models/inventory_model");

const createInventory = async (req, res) => {
  if (req.body) {
    const inventory = new Inventory(req.body);
    await inventory
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

module.exports = {
  createInventory,
};
