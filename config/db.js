var express = require("express");
var mysql = require("mysql");


var cors=require("cors");



var app=express();
app.use(cors());
app.use(express.json());


module.exports = db;