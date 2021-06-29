User = require('../models/userModel');

const pw = require('../utility/password');

const token = require('../utility/token');

exports.index = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access');
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
    }
    catch {
        return res.json({
            status:403,
            message:'Unauthorized'
        });
    }

};


exports.login = function (req,res)  {
    User.find({name:req.body.name},function (err,user) {
        if(err)
            res.json({
                status:400,
                message:err
            })
        else if(pw.isValid(req.body.password,user.password))
            res.json({
                status:200,
                secret_token:token.generateToken({user:user._id},'access'),
                refresh_token:token.generateToken({user:user._id},'refresh')
            })
        else
            res.json({
                status:401,
                message:'Password is not true'
            });
    });
}


exports.register = function (req,res) {
    var user = new User();
    user.name = req.body.name;
    user.password = pw.hash(req.body.password);

    user.save(function (err) {
        if(err)
            res.json(err);
        
        res.json({
            status:200,
            data:user,
            secret_token:token.generateToken({user:user._id},'access'),
            refresh_token:token.generateToken({user:user._id},'refresh') 
        });
    });
};

exports.view = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access');
        User.findById(req.params.user_id,function(err,user){
            if(err)
                res.send(err);
            else
                res.json({
                    status:200,
                    data:user
                });
        });
    }
    catch {
        return res.json({
            status:403,
            message:'Unauthorized'
        });
    }
};

exports.update = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access');
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
    }
    catch {
        return res.json({
            status:403,
            message:'Unauthorized'
        });
    }
};


exports.delete = function (req,res) {
    try {
        var user = token.verifyToken(req.body.token,'access');
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
    }
    catch {
        return res.json({
            status:403,
            message:'Unauthorized'
        });
    }
};