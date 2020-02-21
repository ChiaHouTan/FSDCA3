const mongoose  = require('mongoose');
const validator = require('validator');

const SchemeConfig = {timestamps: true, skipVersioning: true};
const GameSchema  = new mongoose.Schema({

    title: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

    genre: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },
    
    image: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

    trailer: {
      type      : String,
      required  : true,
      validator : value => !validator.isEmpty(value)
    },

  }, SchemeConfig);

  module.exports.Game = mongoose.model('Game', GameSchema);