const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Console   = require('../models/Console').Console;

/**
 * Functionality for this route:
 *  C   POST    /Consoles/        Create a new Console
 *  R   GET     /Consoles         Gets an array of all Consoles
 *  R   GET     /Consoles/:id     Get a single Console, by ID
 *  U   PUT     /Consoles/:id     Update a single Console, by id
 *  D   DELETE  /Consoles/:id     Delete a single Console, by ID
 *  P   PATCH  /Consoles/:id     Update a single Console with particular data, by ID
 */

// GET an array of all Consoles change
router.get('/', (req, res) => {
    return mongoose
      .model('Console')
      .find({})
      .then (consoles => res.json(consoles))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single Console by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Console')
    .findOne({_id: req.params.id})
    .then (console => res.json(console))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new console
router.post('/', (req, res) => {
  return new Console({
    name     : req.body.name,
    image   : req.body.image,
    stock  : req.body.stock,
  })
  .save()
  .then (console => Console.populate(console, {path: '_id'}))
  .then (console => res.json(console))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Console
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a console
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Console
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
      name     : req.body.name,
      image   : req.body.image,
      stock  : req.body.stock,
      }},
      {new: true}
    )
    .then (console => Console.populate(console, {path: '_id'}))
    .then (console => res.json(console))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PATCH Update a console
router.patch('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Console
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
      stock  : req.body.stock,
      }},
      {new: true}
    )
    .then (console => Console.populate(console, {path: '_id'}))
    .then (console => res.json(console))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;