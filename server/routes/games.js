const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose'); // using to generate ObjectIDs
const Game   = require('../models/Game').Game;

/**
 * Functionality for this route:
 *  C   POST    /Games/        Create a new Game
 *  R   GET     /Games         Gets an array of all Games
 *  R   GET     /Games/:id     Get a single Game, by ID
 *  U   PUT     /Games/:id     Update a single Game, by id
 *  D   DELETE  /Games/:id     Delete a single Game, by ID
 */

// GET an array of all Games change
router.get('/', (req, res) => {
    return mongoose
      .model('Game')
      .find({})
      .then (games => res.json(games))
      .catch(err => res
        .status(500)
        .json({ok: false})
      );
  });

  // GET a single game by ID
router.get('/:id([0-9a-fA-F]{24})', (req, res) => {
  return mongoose
    .model('Game')
    .findOne({_id: req.params.id})
    .then (game => res.json(game))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// POST Create a new game
router.post('/', (req, res) => {
  return new Game({
    title     : req.body.title,
    genre     : req.body.genre,
    image   : req.body.image,
    trailer   : req.body.trailer,
  })
  .save()
  .then (game => Game.populate(game, {path: '_id'}))
  .then (game => res.json(game))
  .catch(err => res
    .status(400)
    .json({ok: false, error: err.message})
  );
});

// DELETE Delete a topic with a given ID
router.delete('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Game
    .deleteOne({_id: req.params.id})
    .then (() => res.json({'ok': true}))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

// PUT Update a game
router.put('/:id([0-9a-fA-F]{24})', (req, res) => {
  return Game
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: {
        title  : req.body.title,
        genre   : req.body.genre,
        image   : req.body.image,
        trailer   : req.body.trailer,
      }},
      {new: true}
    )
    .then (game => Game.populate(game, {path: '_id'}))
    .then (game => res.json(game))
    .catch(err => res
      .status(500)
      .json({ok: false})
    );
});

  module.exports = router;