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
app.use('/type', require('./Routes/typeRoute'))
app.use('/place', require('./Routes/placeRoute'))
app.use('/book', require('./Routes/bookRoute'))
app.use('/host', require('./Routes/hostRoute'))
app.use('/review', require('./Routes/reviewRoute'))






const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));