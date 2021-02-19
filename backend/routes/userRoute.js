let  express =require('express');
let User =require('../models/userModel') ;
let functions=require('../util')

const router = express.Router();
router.post('/signin',async(req,res)=>{
    const signinuser=await User.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if (signinuser) {
        const {id,name,email,isAdmin}=signinuser
        res.send({
            _id:id,
            name:name,
            email:email,
            isAdmin:isAdmin,
            token:functions.getToken(signinuser)
        })
    } else {
        res.status(401).send({message:"Invalid username or password"})
    }
})
router.post('/register', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: functions.getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  });
router.get("/createAdmin",async (req,res)=>{
    try {
        const user=new User({
            name:'luffy',
            email:'luffy@gmail.com',
            password:'1234',
            isAdmin:true
        });
        const newUser=await user.save();
        res.send(newUser);  
    } catch (error) {
        res.send({msg:error.message})
    }

})
module.exports = router;