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
// Soap.create( soapSeed, ( err , data ) => {
//       if ( err ) console.log ( err.message )
//           console.log( "added provided soap data" )
//       }
// );

// ****************************************
// ************ INDEX ROUTE   *************
// ****************************************
router.get('/soap', (req, res)=>  {
  // res.send('index');
  Soap.find({}, (error, allSoap)=>  {
    res.render(
      'index.ejs',
      {
      soap:allSoap,
      });
  });
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
router.get('/soap/:id/edit', (req, res)=> {
    // res.send('edit route');
    Soap.findById(req.params.id, (err, foundSoap)=>{
        res.render(
    		'edit.ejs',
    		{
          soap: foundSoap,
    		}
    	);
    });
});

// ****************************************
// ************** SHOW ROUTE **************
// ****************************************
// set up soap show route and display parameters of soap selected by user
router.get('/soap/:id', (req, res)=>  {
  // res.send('show');
  // res.send(req.params.id)
  Soap.find({}, (error, allSoap)=>  {
    res.render(
      'show.ejs',
      {
      // soap is a variable
      // soaps[req.params.id] is the value
      soap:allSoap[req.params.id]
      }
    );
  });
});

// ****************************************
// ============= ACTION ROUTES ============
// ****************************************


// ****************************************
// ************** PUT ROUTE ***************
// ****************************************
// posts the change from edit
router.put('/soap/:id', (req, res)=>{
    // res.send(req.params.id);
    // res.send(req.body)

      // create a soap object to match the data structure
      // of the model.  The data needs to be re-shaped from
      // the req.body form

      let editSoap = {
          name: req.body.name,
          image: req.body.image,
          percentSuperFat: req.body.percentSuperFat,
          ingredients:
          {
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
          lyeCalculation:
          {
            minimumWaterNeeded: req.body.minimumWaterNeeded,
            sodiumHydroxide: req.body.sodiumHydroxide,
          },
          totalOilsWeight: req.body.totalOilsWeight,
          totalRecipeWeight: req.body.totalRecipeWeight,
          totalBarsAvail: req.body.totalBarsAvail,
          exfoliating: req.body.exfoliating,
          notes: req.body.notes
        }

        // console.log(editSoap)
        Soap.findByIdAndUpdate(
          req.params.id,
          editSoap,
          {new:true},
          (err, updatedSoap) => {
            // res.send(updatedSoap);
         res.redirect('/soap');  //redirect to index page
        });
});

// ****************************************
// ********  CREATE "POST" ROUTE   ********
// ****************************************
// creates a new soap
router.post('/soap/', (req, res)=> {
  // console.log(req.body);
  // res.send('new soap post route');
  // res.send(req.body);

// create a new soap object to match the data structure
// of the model.  The data needs to be re-shaped from
// the req.body form

let newSoap = {
    name: req.body.name,
    image: req.body.image,
    percentSuperFat: req.body.percentSuperFat,
    ingredients:
    {
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
    lyeCalculation:
    {
      minimumWaterNeeded: req.body.minimumWaterNeeded,
      sodiumHydroxide: req.body.sodiumHydroxide,
    },
    totalOilsWeight: req.body.totalOilsWeight,
    totalRecipeWeight: req.body.totalRecipeWeight,
    totalBarsAvail: req.body.totalBarsAvail,
    exfoliating: req.body.exfoliating,
    notes: req.body.notes
  }

  console.log(newSoap)
  Soap.create( newSoap, ( err , data ) => {
        if ( err ) console.log ( err.message )
            console.log( "added new soap data" )
        }
  );
  res.redirect('/soap')

});

// ****************************************
// ***********  DELETE ROUTE  *************
// ****************************************
router.delete('/:id', (req, res)=>{
// console.log("in log/delete");
// res.send('deleting...');
  Soap.findByIdAndRemove(
    req.params.id,
    (err, data) => {
    res.redirect('/soap');  //redirect to soap index page
    });
});

module.exports = router;
