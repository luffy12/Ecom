const express = require('express');
let data = require('./data');
let userRoute = require('./routes/userRoute');
let productRoute = require('./routes/productRoute');
let orderRoute = require('./routes/orderRoute');
let authRoute=require('./routes/authRoute');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();     
// import data from './data'
const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(
    cors({
      origin: [
        "http://localhost:3000",
      ],
      methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
      credentials: true //allow setting of cookies
    })
  );
const uri =process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true })
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("mongoose connection success")
})
// app.get("/api/products/:id",(req,res)=>{
// const productId=req.params.id;
// const product=data.products.find(x=>x._id===productId);
// if(product){
// res.send(product);
// }
// else{
// res.status(404).send({msg:"product not found"});
// }
// })
// app.get("/api/products",(req,res)=>{
// res.send(data.products);
// })
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/',authRoute);
app.use('/api/orders', orderRoute);
app.listen(5000, ()=>{console.log('server has started')})