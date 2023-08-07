const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const conn = require('./database/conn');
const router = require('./routing/routing');


require('dotenv').config();
const app=express();

const PORT=process.env.PORT;

// middlewares 
app.use(bodyParser.json());
app.use(cors());


app.use('/blog',router);

// Routing 

app.get('/',(req,res)=>
{
    res.send("Hello from node js");
})


// listening

app.listen(PORT,()=>
{
  console.log(`SERVER IS STARTED ON ${PORT} PORT`);
  conn();
})