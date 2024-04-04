const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  category:{
    type: Schema.Types.ObjectId,
    required: true,
    ref:'PetCategory'
},
// subCategory:{
//   type: Schema.Types.ObjectId,
//   required: true,
//   ref:'SubCategory'
// },
 
  name: {
    type: Schema.Types.String,
    required: true,
  },
  type: {
    type: Schema.Types.Array,
    required: true,
  },
  // description: {
  //   type: Schema.Types.String,
  //   required: true,
  // },
  // tags: {
  //   type: Schema.Types.Array,
  //   required: true,
  // },
  isDeleted: {
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  },
  isActive: {
    type: Schema.Types.Boolean,
    default: false,
    required: true,
  },
 
  
  // cancellationPolicy: {
  //   freeCancellationUpTo: {
  //     type: Schema.Types.Number, // free cancellation upto hours beofre the scheduled.
  //   },
  //   refundPercentage: {
  //     type: Schema.Types.Number,

  //   }
  // },
  rates:[
  //   {
  //     paymentAttributeName:{
  //       type: Schema.Types.String,
  //     },
  //     min:{
  //       type: Schema.Types.Number,
  //     },
  //     max:{
  //       type: Schema.Types.Number,
  //     },
  //     price:{
  //       type:Schema.Types.Array
  //     },
  //     calculationType:{
  //       type:Schema.Types.String
  //     }
  // }
  ]
   


});

module.exports = mongoose.model("Service", serviceSchema);


// sample entry of a service

// {
//   "_id": {
//     "$oid": "65f81835ed7f683b9884af3d"
//   },
//   "category": {
//     "$oid": "65f1700b8f450d35232b1503"
//   },
//   "name": "Lab Care Pta",
//   "type": [],
//   "isDeleted": false,
//   "isActive": false,
//   "rates": [
//     {
//       "id": 1,
//       "price": [
//         {
//           "id": 1,
//           "keyName": "1",
//           "value": "100"
//         },
//         {
//           "id": 2,
//           "keyName": "5",
//           "value": "250"
//         },
//         {
//           "id": 3,
//           "keyName": "10",
//           "value": "500"
//         }
//       ],
//       "paymentAttributeName": "Age",
//       "calculationType": "range"
//     },
//     {
//       "id": 2,
//       "price": [
//         {
//           "id": 1,
//           "keyName": "Male",
//           "value": "100"
//         },
//         {
//           "id": 2,
//           "keyName": "Female",
//           "value": "250"
//         }
//       ],
//       "paymentAttributeName": "Sex",
//       "calculationType": "single"
//     }
//   ],
//   "__v": 0
// }


