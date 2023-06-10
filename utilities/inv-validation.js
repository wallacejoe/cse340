const utilities = require("../utilities/")
const { body, validationResult } = require("express-validator")
const invModel = require("../models/inventory-model")
const validate = {}

/*  **********************************
 *  Add Classification Validation Rules
 * ********************************* */
validate.addClassificationRules = () => {
    return [
      // class name is required and must be a string
      body("classification_name")
        .trim()
        .isLength({  min: 1,})
        .withMessage("Please provide a class name."),
    ]
  }

/*  **********************************
 *  Add Classification Validation Rules
 * ********************************* */
validate.addInventoryRules = () => {
    return [
        body("inv_make")
            .trim()
            .isString({
                min: 3,})
            .withMessage("Please provide the make."),
        body("inv_model")
            .trim()
            .isLength({
                min: 3,})
            .withMessage("Please provide the model."),
        body("inv_description")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide a description."),
        body("inv_image")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide the image path."),
        body("inv_thumbnail")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide the thumbnail."),
        body("inv_price")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide the price."),
        body("inv_year")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide vehicle year."),
        body("inv_miles")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide total miles."),
        body("inv_color")
            .trim()
            .isLength({
                min: 1,})
            .withMessage("Please provide the color."),
    ]
  }

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_description, /*inv_image, inv_thumbnail,*/ inv_price, inv_year, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("./inventory/add-inventory", {
        errors,
        title: "Add Vehicle",
        nav,
        classification_id,
        inv_make,
        inv_model,
        inv_description,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
      })
      return
    }
    next()
  }

  module.exports = validate