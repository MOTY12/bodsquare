const { userModel,  } = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
     
        //check user email exist
        let Email = await userModel.findOne({"email": req.body.email})
      
        if(Email){
          return res.status(404).json({
              message: 'Email exist already'
          })
        }
      
        let user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });
      
        const userSaved = await user.save();

        if(userSaved){
          return res.status(200).json({
              message: 'User created successfully'
          })
        }else{
          return res.status(400).json({
              message: 'User not created'
          })}
      }catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
};

const login = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        //compare password
        let isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res.status(401).json({
            message: "Invalid Credentials",
          });
        }

        //generate token  
        let token = await jwt.sign({ id: user._id }, process.env.USER_TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_LIFE,
        });

        res.status(200).json({
          message: "Login successful",
          user: user,
          token: token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
};






module.exports = {
    register,
    login
}

