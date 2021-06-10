var express = require("express");
var router = express.Router();
var mysql=require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livraison'
});


router.get('/livreur', function(req, res,next){
    db.query('SELECT * from livreur ', function(error, rows, fields){
              if(error) console.log(error);
                else{
                   console.log(rows);
                   res.send(rows);
                }
       });
    });
    router.post('/login', function(req, res,next){
        var cinliv=req.body.cinliv;
        var mdpliv=req.body.mdpliv
        db.query('SELECT cinliv,mdpliv from livreur WHERE cinliv=? ',cinliv, function(error, rows, fields){
                  if(error) console.log(error);
                    else{
                       console.log(rows);
                       res.send(rows);
                    }
                    
           });
        });
    
module.exports = router;