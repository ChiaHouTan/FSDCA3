const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const GamePreview    = require('../models/GamePreview').GamePreview;

/**
 * Functionality for this route:
 *  C   POST    /GamePreview/        Create a new GamePreview
 *  R   GET     /GamePreview         Gets an array of all GamePreview
 *  R   GET     /GamePreview/:id     Get a single GamePreview, by ID
 *  U   PUT     /GamePreview/:id     Update a GamePreview, by id
 *  D   DELETE  /GamePreview/:id     Delete a single GamePreview, by ID
 */

// GET an array of all GamePreview
router.get('/', (req, res) => {
  return mongoose
    .model('GamePreview')
    .find({})
    .populate('authoredBy')
    .then (gamePreview => res.json(gamePreview))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// GET a single GamePreview by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('GamePreview')
    .findOne({_id: req.params.id})
    .populate('authoredBy')
    .then (GamePreview => res.json(GamePreview))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new GamePreview
router.post('/', (req, res) => {
  return new GamePreview({
    authoredBy: req.body.authoredBy,
    title     : req.body.title,
    type      : req.body.type,
    content   : req.body.content,
    video     : req.body.video
  })
  .save()
  .then (GamePreview => GamePreview.populate(GamePreview, {path: 'authoredBy'}))
  .then (GamePreview => res.json(GamePreview))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a GamePreview with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return GamePreview
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a GamePreview
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return GamePreview
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
    title     : req.body.title,
    type      : req.body.type,
    content   : req.body.content,
    video     : req.body.video
      }},
      {new: true}
    )
    .then (GamePreview => GamePreview.populate(GamePreview, {path: 'authoredBy'}))
    .then (GamePreview => res.json(GamePreview))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

module.exports = router;
