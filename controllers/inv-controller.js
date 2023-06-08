const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build vehicles by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getVehiclesByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicles by classification view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getVehiclesByIneventoryId(inv_id);
  const grid = await utilities.buildInventoryGrid(data);
  let nav = await utilities.getNav()
  const className = data[0].inv_year + ' ' + data[0].inv_make + ' ' + data[0].inv_model
  res.render("./inventory/inventory", {
    title: className,
    nav,
    grid,
  })
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const className = "Vehicle Management"
  res.render("./inventory/management", {
    title: className,
    nav,
  })
}

/* ***************************
 *  Build add-classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  const className = "Add Classification"
  res.render("./inventory/add-classification", {
    title: className,
    nav,
  })
}

module.exports = invCont