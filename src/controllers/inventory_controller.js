const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const service = require("../services/inventory_service");

module.exports = function () {
  router.post("/create", service.createInventory);
  router.get("/view/supplier/:id", service.viewInventoryBySupplierId);
  router.get("/view/:id", service.viewInventoryById);
  router.put("/update/:id", service.updateInventory);
  router.delete("/delete/:id", service.deleteInventory);

  return router;
};
