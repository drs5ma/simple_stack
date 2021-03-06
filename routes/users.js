
var express = require('express');
var router = express.Router();

/*
 * GET userlist. why am i still calling it userlist?? change this tomorrow
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});



/*
 * DELETE to deleteuser.
 */
//router.delete('/deleteuser/:id', function(req, res) {
router.delete('/deleteuser', function(req, res) {

    var db = req.db;
    var collection = db.get('userlist');
    //var userToDelete = req.params.id;
    //collection.remove({ '_id' : userToDelete }, function(err) {

    collection.remove({ 'cx' : req.body.cx, 'cy' : req.body.cy }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});



module.exports = router;
