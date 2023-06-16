const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the specified classification view HTML
* ************************************ */
Util.buildInventoryGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="details-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_image
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="vehicle">'
      grid += '<p class="bolder">' + vehicle.inv_make + ' ' + vehicle.inv_model + ' ' + 'Details </p>'
      grid += '<div class="vehicle-details">'
      grid += '<p class="vehicle-price">Price: $' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
      grid += '<p class="vehicle-description"><span class="bolder">Description:</span> ' + vehicle.inv_description + '</p>'
      grid += '<p class="vehicle-color"><span class="bolder">Color:</span> ' + vehicle.inv_color + '</p>'
      grid += '<p class="vehicle-miles"><span class="bolder">Miles:</span> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>'
      grid += '</div>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

Util.buildInventoryOptions = async function(){
  let data = await invModel.getClassifications()
  let options = "<select id=\"classificationList\" name=\"classification_id\">"
  options += "<option value=\"#\">Select a Classification</option>"
  data.rows.forEach(classification => { 
    options += "<option value=\"" + classification.classification_id + "\">" + classification.classification_name + "</option>"
  })
  options += "</select>"
  return options
}

/*Util.buildInventoryOptions = async function(){
  let data = await invModel.getClassifications()
  let options
  data.rows.forEach(classification => { 
    options += "<option value=\"" + classification.classification_id + "\">" + classification.classification_name + "</option>"
  })
  return options
}*/

/* ************************
 * Constructs the dropdown HTML list
 ************************** */
/*Util.buildInventoryOptions = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<select name='classification_id' class='classification-options'>"
  data.rows.forEach((row) => {
    list +=
      '<option value="' + row.classification_id +
      '">' +
      row.classification_name +
      "</option>"
  })
  list += "</select>"
  return list
}*/

/*Util.buildInventoryPage = async function(){
  let options
    options += '<form action="/inv/addInventory" method="post">'
      options += '<fieldset>'
        options += '<p>All fields are required.</p>'
        options += '<legend>Add Vehicle</legend>'
        options += '<label class="top">Select Classification:<select type="class" name="classification_id" required value="<%= locals.classification_id %>">'
          options += this.buildInventoryOptions()
        options += '</select></label>'
        options += '<label class="top">Make:<input type="text" name="inv_make" pattern=".{3,}$" required value="<%= locals.inv_make %>"></label>'
        options += '<label class="top">Model:<input type="text" name="inv_model" pattern=".{3,}$" required value="<%= locals.inv_model %>"></label>'
        options += '<label class="description">Description:<textarea type="text" name="inv_description" required value="<%= locals.inv_description %>"></textarea></label>'
        options += '<label class="top">Image Path:<input type="text" name="inv_image" required value="\images\vehicles\no-image.png"></label>'
        options += '<label class="top">Thumbnail Path:<input type="text" name="inv_thumbnail" required value="\images\vehicles\no-image-tn.png"></label>'
        options += '<label class="top">Price:<input type="text" name="inv_price" pattern="[0-9]+" placeholder="decimal or integer" required value="<%= locals.inv_price %>"></label>'
        options += '<label class="top">Year:<input type="text" name="inv_year" pattern="[0-9]{4}$" placeholder="4-digit year" required value="<%= locals.inv_year %>"></label>'
        options += '<label class="top">Miles:<input type="text" name="inv_miles" placeholder="digits only" pattern="[0-9]+" required value="<%= locals.inv_miles %>"></label>'
        options += '<label class="top">Color:<input type="text" name="inv_color" required value="<%= locals.inv_color %>"></label>'
        options += '<input class="submitBtn" type="submit" name="submitf" value="Add Vehicle">'
      options += '</fieldset>'
    options += '</form>'
  return options
}*/

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

/* **************************************
* Build the specified classification view HTML
* ************************************ */
Util.buildError = async function(data){
  let grid
  grid = '<h1> Hello World <h1>'
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util