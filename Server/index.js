const express= require('express')
const mongoose= require('mongoose')
const cors=require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken') 
const UserModel=require('./models/Users')
const DataModel=require('./models/Data')
const ProgressModel= require('./models/Progress')

const app= express();
app.use(
  cors({
    origin: ["https://ded-lift.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json())

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
        res.json({ status: "OK" });
      })
      .catch(err => console.log(err));
  });
  
//Progress 
app.post('/progress', async (req, res) => {
    const { name, size, img, img2 } = req.body;
    ProgressModel.create({ name, size, img, img2 })
      .then(response => {
        res.json({ status: "OK" });
      })
      .catch(err => console.log(err));
  });

app.get("/user/profile", authenticateToken, (req, res) => {
  // If the middleware reaches here, it means the user is authenticated
  // Now, you can fetch the user profile data from MongoDB
  const userEmail = req.user.email;

  UserModel.findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        // Send user profile data as the response
        res.json({
          name: user.name,
          email: user.email,
          // Add other profile data if needed
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching user profile data:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, "jwt-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
}

app.listen(3001, ()=>{
    console.log("server is running")
})