User = require('../models/userModel');

exports.index = function (req,res) {
    User.get(function (err,users) {
        if(err)
        {
            res.json({
                status:400,
                message:err
            });
            console.log(err);
        }
        else
            res.json({
                status:200,
                data:users
            });
   });
};

exports.new = function (req,res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;

    user.save(function (err) {
        if(err)
            res.json(err);
        
        res.json({
            status:200,
            data:user  
        });
    });
};

exports.view = function (req,res) {
    User.findById(req.params.user_id,function(err,user){
        if(err)
            res.send(err);
        else
            res.json({
                status:200,
                data:user
            });
    });
};

exports.update = function (req,res) {
    User.findById(req.params.user_id,function (err,user) {
        if(err)
            res.send(err);
        
        user.name = req.body.name ? req.body.name : user.name;
        user.password = req.body.password;

        user.save(function (err) {
            if(err)
                res.json(err);
            res.json({
                status:200,
                data:user
            });
        });
    });
};


exports.delete = function (req,res) {
    User.deleteOne({
        _id : req.params.user_id
    },function (err,user) {
        if(err)
            res.send(err);
        else
            res.json({
                status:200
            });
    });
};