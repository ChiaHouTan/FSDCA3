const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const GamePreview   = require('../models/GamePreview').GamePreview;

/**
 * Functionality for this route:
 *  C   POST    /GamePreviews/        Create a new GamePreview
 *  R   GET     /GamePreviews         Gets an array of all GamePreviews
 *  R   GET     /GamePreviews/:id     Get a single GamePreview, by ID
 *  U   PUT     /GamePreviews/:id     Update a single GamePreview, by id
 *  D   DELETE  /GamePreviews/:id     Delete a single GamePreview, by ID
 */

// GET an array of all GamePreviews change
router.get('/', (req, res) => {
    return mongoose
      .model('GamePreview')
      .find({})
      .then (gamePreviews => res.json(gamePreviews))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single gamePreview by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('GamePreview')
    .findOne({_id: req.params.id})
    .then (gamePreview => res.json(gamePreview))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new gamePreview
router.post('/', (req, res) => {
  return new GamePreview({
    title     : req.body.title,
  })
  .save()
  .then (gamePreview => GamePreview.populate(gamePreview, {path: '_id'}))
  .then (gamePreview => res.json(gamePreview))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return GamePreview
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a gamePreview
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return GamePreview
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
      }},
      {new: true}
    )
    .then (gamePreview => GamePreview.populate(gamePreview, {path: '_id'}))
    .then (gamePreview => res.json(gamePreview))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;