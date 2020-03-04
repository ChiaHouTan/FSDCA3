const mongoose  = require('mongoose');
const validator = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};
const ConsoleSchema  = new mongoose.Schema({

    name: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

    image: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

    stock: {
      type      : Number,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

  }, SchemeConfig);

  module.exports.Console = mongoose.model('Console', ConsoleSchema);