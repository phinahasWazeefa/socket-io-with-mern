const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    category:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description:{
    type: Schema.Types.String,
    required: true,
  },
  tags:{
    type: Schema.Types.Array,
    required: true,
  },
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

module.exports = mongoose.model("subCategory",subCategorySchema);


