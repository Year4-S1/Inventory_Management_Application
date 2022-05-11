const express = require("express");
const router = express.Router();
const service = require("../services/inventory_service");

module.exports = function () {
  router.post("/create", service.createInventory);
  return router;
};
