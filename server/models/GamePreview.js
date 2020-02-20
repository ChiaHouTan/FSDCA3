const mongoose  = require('mongoose');
const validator = require('validator');
const User      = require('./User').User;

const SchemeConfig = {timestamps: true, skipVersioning: true};
const GamePreviewSchema  = new mongoose.Schema({

  authoredBy: {
    type     : mongoose.Schema.Types.ObjectId,
    required : true,
    ref      : 'User'
  },

  title: {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  },

  type: {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  },

  content: {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  },

  video:  {
    type      : String,
    required  : true,
    validator : value => !validator.isEmpty(value)
  }

}, SchemeConfig);

// Make sure authoredBy is valid before an update
GamePreviewSchema.pre('save', async function() {
  const user = await User.findOne({_id: this.authoredBy})
  if (!user) {
    throw new Error('Field authoredBy does not reference a valid User ID');
  }
});

module.exports.GamePreview = mongoose.model('GamePreview', GamePreviewSchema);