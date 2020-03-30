var express = require('express');
var router = express.Router();
var NotesDB = require('../model/notes');

router.get('/:id', function (req, res, next) {
    NotesDB.find({ email: req.params.id }, function (err, projects) {
        res.json(projects)
    })

});

router.post('/', function (req, res, next) {
    let notesDB = new NotesDB(req.body);
    notesDB.save(function (err, result) {
        if (err) {
            res.json({
                message: "Could not save the notes"
            })
        } else {
            res.json(result)
        }
    })

});

router.put('/:id', function(req, res, next) {
    let obj = {};
    obj.id = req.body._id;
    obj.header = req.body.header;
    obj.description = req.body.description;
    console.log(req.params.id)
    console.log(obj)
    NotesDB.findOneAndUpdate({_id: req.params.id}, obj, function (err, post) {
        console.log(post)
      if (err) return next(err);
      res.json(post);
    });

  });

module.exports = router;