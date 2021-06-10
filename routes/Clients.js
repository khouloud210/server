var express = require("express");
var router = express.Router();
var mysql=require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livraison'
});
router.get('/fiche', function(req, res,next){
    db.query('SELECT * from Client ', function(error, rows, fields){
              if(error) console.log(error);
                else{
                   console.log(rows);
                   res.send(rows);
                }
       });
    });
module.exports = router;