const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require("uuid")


const User = require('../models/userModels')
const HttpError = require("../models/errorModel")
const { json } = require('express')




//===========Register User
//POST :api/users/register
//UNPORTECTED


const registerUser = async(req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        if(!name||!email||!password){
            return next(new HttpError("fill in the all fields",422))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email:newEmail})
        if(emailExists){
            return next(new HttpError("email already exists",422))
        }
        if((password.trim()).length<6){
            return next(new HttpError("password should be at least 6 characters",422))
        }
        if(password != password2){
            return next(new HttpError("password does not matc"),422)
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({name, email: newEmail, password:hashedPass})
        
        res.status(201).json(`New user ${newUser.email} registerd`)

    } catch (error) {
        return next(new HttpError("User registration failed",422))
    }
}








//===========Login a registerd user
//POST :api/users/login
//UNPORTECTED

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return next(new HttpError("Please fill in all fields", 422));
        }

        const newEmail = email.toLowerCase();
        const user = await User.findOne({ email: newEmail });

        // If user is not found, return an error
        if (!user) {
            return next(new HttpError("Login failed. Invalid credentials.", 401));
        }

        // Compare password hashes
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new HttpError("Login failed. Invalid credentials.", 401));
        }

        // If the email and password are valid, generate a JWT token
        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Set expiry time, e.g., 1 hour

        // Send token, user id, and name in response
        res.status(200).json({ token, id, name });
    } catch (error) {
        // Handle any unexpected errors
        console.error("Login error:", error);
        return next(new HttpError("Login failed. Please try again later.", 500));
    }
};








//===========user profile
//POST :api/users/:id
//PORTECTED

const getUser = async(req, res, next) => {
      try {
        const {id} =req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError("user not found",404))
            
        }
        res.status(200).json(user);
      } catch (error) {
        return next (new HttpError(error))
      }

}











//===========change user avatar
//POST :api/users/change-avatar
//PORTECTED

const changeAvatar = async (req, res, next) => {
    try {
       if (!req.files.avatar) {
          return next(new HttpError("please choose an image", 422));
       }
 
       const user = await User.findById(req.user.id);
 
       if (user.avatar) {
          fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
             if (err) {
                return next(new HttpError(err));
             }
          });
       }
 
       const { avatar } = req.files;
 
       if (avatar.size > 500000) {
          return next(new HttpError("too big", 422));
       }
 
       let fileName;
       fileName = avatar.name;
       let splittedFilename = fileName.split('.');
       let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];
 
       avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async(err) => {
          if (err) {
             return next(new HttpError(err));
          }

          const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true });
          if (!updatedAvatar) {
              return next(new HttpError("Avatar cannot be changed", 422));
          }
          
          res.status(200).json(updatedAvatar)
       });
 
    } catch (error) {
       return next(new HttpError(error));
    }
 }
 









//===========edit user details
//POST :api/users/edit-user
//PORTECTED

const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, newConfirmPassword } = req.body;

        if (!name || !email || !currentPassword || !newPassword || !newConfirmPassword) {
            return next(new HttpError("Please fill in all fields", 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 403));
        }

        const emailExist = await User.findOne({ email });
        if (emailExist && emailExist._id != req.user.id) {
            return next(new HttpError("Email already exists", 422));
        }

        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validateUserPassword) {
            return next(new HttpError("Password does not match", 422));
        }

        if (newPassword !== newConfirmPassword) {
            return next(new HttpError("New passwords do not match", 422));
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email, password: hash },
            { new: true }
        );

        if (!updatedUser) {
            return next(new HttpError("Failed to update user information", 500));
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        return next(new HttpError(error.message || "Internal server error", 500));
    }
};









//===========GET AUTHoRS
//POST :api/users/authors
//UNPORTECTED

const getAuthors =async (req, res, next) => {
    
    try {
        const authors = await User.find().select('-password')
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error))
    }

}




module.exports={registerUser, loginUser, getUser ,changeAvatar,editUser, getAuthors}













