// Necessary Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/account-controller")
const utilities = require("../utilities/")
// Route to build account view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

module.exports = router;
