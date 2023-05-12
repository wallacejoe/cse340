const utilities = require("../utilities/")
const baseController = {}
//baseController was "base-controller", was throwing an error.

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

module.exports = baseController