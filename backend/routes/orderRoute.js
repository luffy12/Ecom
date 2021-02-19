let  express =require('express');
let Order =require('../models/orderModel') ;
let functions=require('../util');
require('dotenv').config(); 
const stripe=require('stripe')(process.env.SECRET_KEY);
const uuid=require("uuid")

const router = express.Router();
router.get("/", functions.isAuth, async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.send(orders);
  });
  router.get("/mine", functions.isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  });
  
  router.get("/:id", functions.isAuth, async (req, res) => {
    // console.log("in orderrrrrrrrr",req.params)
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      // console.log("orderrr",order)
      res.send(order);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });
  
  router.delete("/:id", functions.isAuth, functions.isAdmin, async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });

router.post("/pay",async(req,res)=>{
 
  
  const{order,paymentResult}=req.body;
  // console.log("paymentttt2",order);
  // console.log("payment body",paymentResult);
  const idempontencyKey=order._id;

  return  await stripe.customers.create({
    email:paymentResult.email,
    source:paymentResult.id
  }).then(async customer=>{
     stripe.charges.create({
      amount:order.totalPrice*100,
      currency:'usd',
      customer:customer.id,
      receipt_email:paymentResult.email,
     description:'nothing too sasy',
     
    }).then(async res=>{
      // console.log("resultttrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",res)
     
    })
  })
    .then(async result=>{ const neworder = await Order.findById(idempontencyKey);
      if (neworder) {
        neworder.isPaid = true;
        neworder.paidAt = Date.now();
        neworder.payment = {
          paymentMethod: 'stripe',
        }
        const updatedOrder = await neworder.save();
        res.send({ message: 'Order Paid.', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order not found.' })
      }}).catch(err=>console.log(err))
})
  
  router.post("/", functions.isAuth, async (req, res) => {
    // console.log("data in backend ",req.user)
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
  });
module.exports = router;