let router = require('express').Router();

router.get('/',function(req,res) {
    res.json({
        status:200,
        message: 'API V1.0'
    });
});

var userController = require('./controllers/userController');

router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete)


module.exports = router;