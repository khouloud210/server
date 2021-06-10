var express = require("express");
var router = express.Router();
var mysql=require('mysql')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livraison'
});


router.get("/showmission", function(req, res,next) {
    var idmission = req.body.cincli;  
    const cinliv = req.params.cinliv;  
    const prenomcli = req.params.prenomcli;  
      db.query(
          "SELECT idmission,nomliv,prenomliv,nomcli,prenomcli,adressecli,villecli,colis1.refcol,qtécol,datemiss,heuremiss FROM client AS client1 INNER JOIN mission AS mission1 ON client1.cincli=mission1.cincli INNER JOIN livreur AS livreur1 ON livreur1.cinliv=mission1.cinliv INNER JOIN colis AS colis1 ON colis1.refcol=mission1.refcol ",cinliv,function(error, rows, fields){
            if(error) console.log(error);
              else{
                 console.log(rows);
                 res.send(rows);
              }
     });
  });
  router.get("/showmetat",function(req, res,next) {
    const idmission = req.body.idmission;
   
      db.query(
          " SELECT idmission,nomliv,prenomliv,nomcli,prenomcli,adressecli,villecli,etat1.id,gender,colis1.refcol,datemiss,heuremiss FROM client AS client1 INNER JOIN mission AS mission1 ON client1.cincli=mission1.cincli INNER JOIN livreur AS livreur1 ON livreur1.cinliv=mission1.cinliv INNER JOIN colis AS colis1 ON colis1.refcol=mission1.refcol INNER JOIN etat AS etat1 ON etat1.id=mission1.id WHERE mission1.id=6",function(error, rows, fields)
         
           {
    
            if(error) console.log(error);
            else{
               console.log(rows);
               res.send(rows);
            }
              
              }
    
          
    );
  }); 
      router.get("/showcoli",function(req, res,next)  {
      
        var refcol = req.params.refcol;
          db.query(
              "SELECT nomcli,prenomcli, refcol, qtécol,  poids,frais, prix FROM client,colis WHERE client.cincli=colis.cincli ",refcol,function(error, rows, fields){
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