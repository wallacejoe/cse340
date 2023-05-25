// Necessary Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/inv-controller")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by inventory id
router.get("/detail/:inventoryId", invController.buildByInventoryId);
//invController was previously "inv-controller", however this caused an error
module.exports = router;
