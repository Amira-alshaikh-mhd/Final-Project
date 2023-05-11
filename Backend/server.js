const express = require ("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("./db");
const cors = require('cors');


connection();
mongoose.set("strictQuery", true);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));





app.use('/user',require("./Routes/userRoute"))
app.use('/country', require('./Routes/countryRoute'))
app.use('/city', require('./Routes/cityRoute'))






const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));