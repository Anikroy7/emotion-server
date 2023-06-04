const express = require("express");
const cors = require('cors')
const app = express();
require("dotenv").config();
const userRouter= require('./routes/user.route')

app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/user', userRouter)

app.get('/', (req, res)=>{
    res.send('Welcome to Emtion server')
})



app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(400).send({ message: "Something invalid occured" })
})

module.exports = app;
