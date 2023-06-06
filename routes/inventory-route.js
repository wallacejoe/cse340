// Necessary Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/inv-controller")
const utilities = require("../utilities/")
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build inventory by inventory id
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));
// Route to build management view
//router.get("/", utilities.handleErrors(invController.buildManagementView))

module.exports = router;
