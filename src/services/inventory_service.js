const Inventory = require("../models/inventory_model");
const enums = require("../enums/controllers_enums");
const LOG = require("../../controller_log");

const createInventory = async (req, res) => {
  if (req.body) {
    const inventory = new Inventory(req.body);
    await inventory
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
        LOG.info(enums.inventory.CREATE_SUCCESS);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
        LOG.info(enums.inventory.CREATE_ERROR);
      });
  }
};

const viewInventoryBySupplierId = async (req, res) => {
  await Inventory.find({ supplierId: req.params.id })
    .then((data) => {
      res.status(200).send({ data: data });
      LOG.info(enums.inventory.VIEW_SUCCESS);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
      LOG.info(enums.inventory.VIEW_UNSUCCESS);
    });
};

const viewInventoryById = async (req, res) => {
  if (req.params && req.params.id) {
    await Inventory.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
        LOG.info(enums.inventory.VIEW_SUCCESS);
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
        LOG.info(enums.inventory.VIEW_UNSUCCESS);
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
          LOG.info(enums.inventory.UPDATED_ERROR);
        } else {
          res.status(200).send(result);
          LOG.info(enums.inventory.UPDATED_SUCCESS);
        }
      }
    );
  }
};

const deleteInventory = async (req, res) => {
  //check if the req body is empty
  const id = req.params.id;
  console.log(id);

  //delete product data from database
  await Inventory.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.status(200).send(response);
      LOG.info(enums.inventory.DELETE_SUCCESS);
    })
    .catch((err) => {
      res.status(500).send(err.message);
      LOG.info(enums.inventory.DELETE_ERROR);
    });
};

module.exports = {
  createInventory,
  viewInventoryBySupplierId,
  viewInventoryById,
  updateInventory,
  deleteInventory,
};
