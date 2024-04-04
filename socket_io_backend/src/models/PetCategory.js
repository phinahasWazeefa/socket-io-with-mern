const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  types:{
    type:Schema.Types.Array
  },
  attributes:[
    {
        name:{
            type: Schema.Types.String,
        },
        required:{
            type:Schema.Types.Boolean
        },
        possibleValues:{
            type: Schema.Types.Array
        },
        fielType:{
            type: Schema.Types.String // string, number, dropdown, boolean
        }
    }
  ],
  // paymentAttributes:[
  //   {
  //       name:{
  //           type: Schema.Types.String,
  //       },
  //       doesMinMax:{
  //           type:Schema.Types.Boolean
  //       },
  //       keys:{
  //           type: Schema.Types.Array
  //       },
  //       typeForKeyInput:{
  //           type: Schema.Types.String // string, number, dropdown, boolean
  //       }
  //   }
  // ],
//   description:{
//     type: Schema.Types.String,
//     required: true,
//   },
//   tags:{
//     type: Schema.Types.Array,
//     required: true,
//   },
  isDeleted:{
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  },
  isActive:{
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  }

});

module.exports = mongoose.model("PetCategory",categorySchema);


