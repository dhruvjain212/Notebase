const express= require('express');
const router= express.Router();
const User= require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser= require('../middleware/fetchuser')

const JWT_SECRET= "hell0";

// ROUTE 1: create a user using: POST "/api/auth/createUser".  Doesn't require auth
router.post('/createUser',[
  // username must be at least 3 chars long
  body('name','Enter a valid name').isLength({ min: 3 }),
    // email must be an email
    body('email').isEmail(),
    // password must be atleast 6 chars long
    body('password').isLength({ min: 6 }),

], async (req, res) => {
       
     let success= false;
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ success,errors: errors.array() });
        }
        //chext whether the user with this email exists already or not
        try{
        let user= await User.findOne({email: req.body.email});
        if(user){
          return res.status(400).json({success,error:"Sorry a user with this email already exists"})

        }
        
        const salt = await bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hashSync(req.body.password, salt);

        //create a new user
        user= await User.create({
          name: req.body.name,
          password: secPassword,
          email: req.body.email,
        })

        const data={
          user:{
            id: user.id
          }
        }
        const authToken= jwt.sign(data, JWT_SECRET);
         
        // sending success=true in json or console
        success=true;
        res.json({success,authToken});
        //.then(user => res.json(user));

       // res.send(req.body);
      }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
      } 
    } 
)

//ROUTE 2: create a user using: POST "/api/auth/createUser".  Doesn't require auth
router.post('/login',[
// checking if email matches within database or not
  body('email','email cannot be blank').isEmail(),
  body('password','password cannot be blank').exists()

], async (req, res) => {
    let success= false;
  const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

  const {email,password}= req.body;
  try{
    let user = await User.findOne({email: req.body.email})
    if(!user){
      success=false
      return res.status(400).json({success,error: "Please login with valid credentials"})
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
      success=false
      return res.status(400).json({success,error:"Please login with valid credentials"})
    }


    const data={
      user:{
        id: user.id
      }
    }
    const authToken= jwt.sign(data, JWT_SECRET);
   success= true
    res.json({success,authToken});
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error at login endpoint");
  }
})

//ROUTE 3: get logged in user details using: POST "/api/auth/getUser". require login
router.post('/getUser',fetchuser,async (req, res) => {

  try{
    userId=req.user.id
    const user= await User.findById(userId).select("-password")
    res.send(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error at login endpoint");
     }
  })
module.exports= router;