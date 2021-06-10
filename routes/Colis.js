var express = require("express");
var router = express.Router();
var mysql=require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livraison'
});


router.get("/coli", function(req, res,next) {
    var cincli = req.body.cincli;  
    const nomcli = req.params.nomcli;  
    const prenomcli = req.params.prenomcli;  
      db.query(
          "SELECT * FROM colis  ",cincli ,function(error, rows, fields){
            if(error) console.log(error);
              else{
                 console.log(rows);
                 res.send(rows);
              }
     });
  });
   
      router.get("/showcoli",function(req, res,next)  {
      
        var refcol = req.params.refcol;
          db.query(
              "SELECT nomcli,prenomcli, refcol, qtécol,  poids,frais, colis.cincli, prix FROM client,colis WHERE client.cincli=colis.cincli ",refcol,function(error, rows, fields){
                if(error) console.log(error);
                  else{
                     console.log(rows);
                     res.send(rows);
                  }
         });
      });
       
        
     
            
        router.get("/showcolifromref/:refcol", (req, res) => {
      const refcol=req.params.refcol
        
          db.query(
              "SELECT nomcli,prenomcli,adressecli,telportablecli, refcol, qtécol,  poids,frais, prix FROM client,colis WHERE client.cincli=colis.cincli AND refcol=? ",refcol,
             
              (err, result) => {
        
              
                  if (err) {
                      console.log(err);
                    } else {
                      res.send(result);
                    }
                  
                  }
        
              
        );
          
          
        });
        router.get("/colisnbr",function(req, res,next)  {
          var nocolis = req.body.nocolis   
          db.query(
              "SELECT COUNT(*) as nocolis FROM colis  ",
              nocolis,function(error, rows, fields){
                if(error) console.log(error);
                  else{
                     console.log(rows);
                     res.send(rows);
                  }
         });
      });
                router.delete('/deletecolis/:refcol' , (req, res) => {
                  const refcol = req.params.refcol
                  db.query("DELETE FROM colis WHERE refcol = ?" , refcol, (err, result)=> {
                    if (err) {
                      console.log(err)
                    }else {
                      res.send(result);
                    }
                  })
                }
                )
module.exports = router;