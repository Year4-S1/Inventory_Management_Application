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

const viewInventoryBySupplierId = async (req, res) => {
  await Inventory.find({ supplierId: req.params.id })
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const viewInventoryById = async (req, res) => {
  if (req.params && req.params.id) {
    await Inventory.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const updateInventory = async (req, res) => {
  if (!req.is("application/json")) {
    res.send(400);
  } else {
    Inventory.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          itemName: req.body.itemName,
          itemImage: req.body.itemImage,
          itemDescription: req.body.itemDescription,
          itemPrice: req.body.itemPrice,
          itemQuantity: req.body.itemQuantity,
        },
      },
      { upsert: true },
      function (err, result) {
        if (err) {
          res.status(500).send(body);
        } else {
          res.status(200).send(result);
        }
      }
    );
  }
};

module.exports = {
  createInventory,
  viewInventoryBySupplierId,
  viewInventoryById,
  updateInventory,
};
