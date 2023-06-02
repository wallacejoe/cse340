const utilities = require("../utilities/")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/login", {
      title: "Login",
      nav,
    })
  }
  
  module.exports = { buildLogin }