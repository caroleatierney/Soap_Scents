// ******************************
// ******* DEPENDENCIES *********
// ******************************
const express = require('express')
const router = express.Router()

// ******************************
// **********  DATABASE *********
// ******************************
const Soap = require('../models/soap.js')
const soapSeed = require('../models/soapSeed')

// * * * * * * * * *  * * * * * * * * * * *
// * * * * * * * GET ROUTES * * * * * * * *
// * * * * * * ORDER MATTERS  * * * * * * *
// * * * * * * * * *  * * * * * * * * * * *

// ******************************
// ***** CONNECT TO HEROKU ******
// ******************************
// test to see if it connects
// app.get('/' , (req, res) => {
//   res.send('Hello World! I am going to be sending soap data to Heroku');
// });

// ******************************
// ** POPULATE WITH SEED DATA ***
// ******************************
// ** remove after running once
// Soap.create(soapSeed)
//   .then((data) => {
//     console.log("added provided soap data");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// ****************************************
// ************ INDEX ROUTE   *************
// ****************************************
router.get("/soap", async (req, res) => {
  try {
    const allSoap = await Soap.find({});
    res.render("index.ejs", { soap: allSoap });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Error fetching soap data");
  }
});

// ****************************************
// ************** NEW ROUTE ***************
// ****************************************
router.get('/soap/new', (req, res) => {
  // res.send('new soap route');
  res.render(
    'new.ejs'
  )
})

// ****************************************
// *************  EDIT ROUTE   ************
// ****************************************

router.get("/soap/:id/edit", async (req, res) => {
  try {
    const foundSoap = await Soap.findById(req.params.id);
    res.render("edit.ejs", { soap: foundSoap });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit page");
  }
});

// ****************************************
// ************** SHOW ROUTE **************
// ****************************************
// set up soap show route and display parameters of soap selected by user
router.get("/soap/:id", async (req, res) => {
  try {
    const foundSoap = await Soap.findById(req.params.id);
    res.render("show.ejs", { soap: foundSoap });
  } catch (err) {
    console.error(err);
    res.status(404).send("Soap not found");
  }
});

// ****************************************
// ============= ACTION ROUTES ============
// ****************************************


// ****************************************
// ************** PUT ROUTE ***************
// ****************************************
// posts the change from edit
router.put('/soap/:id', async (req, res)=>{
      // create a soap object to match the data structure
      // of the model.  The data needs to be re-shaped from
      // the req.body form

try {
    let editSoap = {
      name: req.body.name,
      image: req.body.image,
      percentSuperFat: req.body.percentSuperFat,
      ingredients: {
        ingredient1: req.body.ingredient1,
        amount1: req.body.amount1,
        ingredient2: req.body.ingredient2,
        amount2: req.body.amount2,
        ingredient3: req.body.ingredient3,
        amount3: req.body.amount3,
        ingredient4: req.body.ingredient4,
        amount4: req.body.amount4,
        ingredient5: req.body.ingredient5,
        amount5: req.body.amount5,
        ingredient6: req.body.ingredient6,
        amount6: req.body.amount6,
        ingredient7: req.body.ingredient7,
        amount7: req.body.amount7,
        ingredient8: req.body.ingredient8,
        amount8: req.body.amount8
      },
      costPerBar: req.body.costPerBar,
      costPerPound: req.body.costPerPound,
      addCostToGiftWrapPerBar: req.body.addCostToGiftWrapPerBar,
      lyeCalculation: {
        minimumWaterNeeded: req.body.minimumWaterNeeded,
        sodiumHydroxide: req.body.sodiumHydroxide,
      },
      totalOilsWeight: req.body.totalOilsWeight,
      totalRecipeWeight: req.body.totalRecipeWeight,
      totalBarsAvail: req.body.totalBarsAvail,
      exfoliating: req.body.exfoliating,
      notes: req.body.notes
    };

    await Soap.findByIdAndUpdate(
      req.params.id,
      editSoap,
      { new: true }
    );

    res.redirect('/soap');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating soap');
  }
});

// ****************************************
// ********  CREATE "POST" ROUTE   ********
// ****************************************
// creates a new soap
//  THE FIX: Use async/await with try/catch
router.post('/soap', async (req, res) => {
  try {

    req.body.exfoliating = req.body.exfoliating === "on";

    // Wait for the database to create the new soap document
    const newSoap = await Soap.create(req.body);
    
    // Successfully created! Redirect back to the index page
    res.redirect('/soap');
  } catch (err) {
    // If something goes wrong (e.g., validation failure), catch the error here
    console.error("Error creating soap recipe:", err);
    res.status(500).send("An error occurred while saving your recipe.");
  }
});

// ****************************************
// ***********  DELETE ROUTE  *************
// ****************************************
router.delete("/soap/:id", async (req, res) => {
// console.log("in log/delete");
// res.send('deleting...');

  try {
    await Soap.findByIdAndDelete(req.params.id);
    res.redirect("/soap"); //redirect to soap index page
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting soap");
  }
});

module.exports = router;