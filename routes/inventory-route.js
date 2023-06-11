// Necessary Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/inv-controller")
const utilities = require("../utilities/")
const invValidate = require('../utilities/inv-validation')
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build inventory by inventory id
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));
// Route to build management view
router.get("/manage", utilities.handleErrors(invController.buildManagementView));
// Route to build add-classification view
router.get("/addClassification", utilities.handleErrors(invController.buildAddClassificationView));
// Process the add-classification attempt
router.post(
    '/addClassification',
    invValidate.addClassificationRules(),
    invValidate.checkClassData,
    utilities.handleErrors(invController.addClassificationName));

router.get("/addInventory", utilities.handleErrors(invController.buildAddInventoryView));

router.post(
    '/addInventory',
    invValidate.addInventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventoryVehicle))

module.exports = router;
