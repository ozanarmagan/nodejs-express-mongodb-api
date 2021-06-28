let express = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: false
  }));

var port = process.env.PORT || 8080;

app.get('/', (req,res) => res.send("API V1.0"));

app.listen(port, function() {
    console.log("Running on port " + port);});

let apiRoutes = require('./routes');

app.use('/api',apiRoutes);


let mongoose = require('mongoose');

let constants = require('./constants/index');

mongoose.connect(constants.MONGO_DB_URL,{useNewUrlParser:true,useUnifiedTopology:true});

var db = mongoose.connection;

if(!db)
    console.log("ERROR WHILE DB CONN");
else
    console.log("Database Connection Successful");

