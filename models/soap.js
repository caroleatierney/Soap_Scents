// Soap Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
const soapSchema = new Schema(
{
      name: String,
      image:  String,
      percentSuperFat: Number,
      ingredients:
      {
          ingredient1: String,
          amount1: Number,
          ingredient2: String,
          amount2: Number,
          ingredient3: String,
          amount3: Number,
          ingredient4: String,
          amount4: Number,
          ingredient5: String,
          amount5: Number,
          ingredient6: String,
          amount6: Number,
          ingredient7: String,
          amount7: Number,
          ingredient8: String,
          amount8: Number
      },
      costPerBar: {type: Number, default: 5},
      costPerPound: {type: Number, default: 55},
      addCostToGiftWrapPerBar: {type: Number, default: 1.5},
      lyeCalculation:
      {
        minimumWaterNeeded: Number,
        sodiumHydroxide: Number,
      },
      totalOilsWeight: Number,
      totalRecipeWeight: Number,
      totalBarsAvail: Number,
      exfoliating: {type: Boolean, default: false},
      notes: String
} , {timestamps: true});

// has to be below soapSchema initialization
const Soap = mongoose.model('Soap', soapSchema);
module.exports = Soap
