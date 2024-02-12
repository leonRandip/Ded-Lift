const express= require('express')
const mongoose= require('mongoose')
const cors=require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const UserModel=require('./models/Users')
const DataModel=require('./models/Data')
const ProgressModel= require('./models/Progress')

const app= express();
app.use(cors({
    origin: ['http://localhost:3002'],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb+srv://Randip:Abcd12345678$@randipdb.pao3rhk.mongodb.net/RandipDB?retryWrites=true&w=majority')
.then(console.log('Connected'))

//SIGN UP
app.post('/register',(req,res)=>{
    const {name, email, password} =req.body;
    bcrypt.hash(password, 10)
    .then(hash=> {
        UserModel.create({name, email, password: hash})
        .then(e=> {
            res.json({status: "OK"});   
        })
        .catch(err=>res.json(err))
    }).catch(err=>res.json(err))
})

//SIGN IN
app.post('/login', (req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, (err,response)=>{
                if(response){
                    const token=jwt.sign({email: user.email, role: user.role}, "jwt-secret-key", {expiresIn:"1d"})
                    res.cookie('token', token)
                    return res.json({Status:"Success"})
                }
                else{
                    return res.json("The password is incorrect")
                }
            })
        }
        else{
            return res.json("No user found")
        }
    })
})

//Wilks calc
app.post('/wilks', async (req, res) => {
    const { bodyWeight, totalWeight, wilksScore } = req.body;
    DataModel.create({ bodyWeight, totalWeight, wilksScore })
      .then(response => {
        response.json({ status: "OK" });
      })
      .catch(err => console.log(err));
  });
  
//Progress 
app.post('/progress', async (req, res) => {
    const { name, size, img, img2 } = req.body;
    ProgressModel.create({ name, size, img, img2 })
      .then(response => {
        response.json({ status: "OK" });
      })
      .catch(err => console.log(err));
  });


app.listen(3001, ()=>{
    console.log("server is running")
})