var express = require('express');
var router = express.Router();
var userDB = require('../model/user');

router.get('/:id', function (req, res, next) {
    console.log(req.params.id);
    userDB.find({ _id: req.params.id }, function (err, data) {
        res.json(data);
    })

});

router.post('/', function (req, res, next) {

    let objectSave = {
        _id: req.body.email,
        name: req.body.name,
        password: req.body.password

    }
    var userData = new userDB(objectSave);
    userData.save(function (err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }

    })

});

router.post('/login', function (req, res, next) {




    // fetch user and test password verification
    userDB.findOne({ _id: req.body.email }, function (err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err) {
                throw err;
            } else if (isMatch) {
                res.json({
                    userId: user._id,
                    message: "Succesfull",
                    successful: true

                })
            } else {
                res.json(
                    {
                        message: "username or password is wrong ",
                        successful: false
                    }
                )
            }
        });


    });


});

module.exports = router;