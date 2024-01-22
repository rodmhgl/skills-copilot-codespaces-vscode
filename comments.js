// Create web server
var express = require('express');
var router = express.Router();
var Comments = require('../models/comments');

// GET /comments
// Get all comments
router.get('/', function(req, res, next) {
  Comments.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// POST /comments
// Create new comment
router.post('/', function(req, res, next) {
  var comment = new Comments(req.body);
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// GET /comments/:id
// Get comment by id
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Comments.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error('404', 'Comment not found'));
    }
    res.json(comment);
  });
});

// PUT /comments/:id
// Update comment by id
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  Comments.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error('404', 'Comment not found'));
    }
    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.comment = req.body.comment;
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

// DELETE /comments/:id
// Delete comment by id
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  Comments.findByIdAndRemove(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return next(new Error('404', 'Comment not found'));
    }
    res.json(comment);
  });
});

module.exports = router;