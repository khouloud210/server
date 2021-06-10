var mysql = require("mysql");
var express = require("express");
var app = express();
var path=require('path')

//var cors = require("cors");
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

//app.use(cors());

app.use(express.json());
var mysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'livraison'
});

var livreuRoute=require('./routes/Livreur');
app.use("/livreur",livreuRoute)
var clientRoute=require('./routes/Clients');
app.use("/client",clientRoute)
var colisRoute=require('./routes/Colis');
app.use("/colis",colisRoute)
var missionRoute=require('./routes/Mission');
app.use("/mission",missionRoute)
var server = app.listen(4002, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("start");
    //console.log("Server started on Port 4002");
});

mysql.connect(function(error){
    if(error) console.log(error);
    else console.log("Server started on Port 4002");
})


