import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../models/user.model";
export const router = express.Router();

//Register User using has, bcrypt && salt

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, username, dob, email, password } = req.body.firstTimeUser;
  const hashPassword = await bcrypt.hash(password, 16);
  const newUser = new User({
    firstName,
    lastName,
    username,
    dob,
    email,
    password: hashPassword,
  });
  try {
    const dbUsers = await User.findOne({ username: username });
    if (!dbUsers) {
      const savedNewUser = await newUser.save();
      res.status(200).json({
        message: `new user, ${firstName}  ${lastName} was succesfully created successfully`,
        success: true,
        data: savedNewUser,
      });
    } else {
      res.status(400).json({
        message: "Existing user, please register with another credential",
        success: false,
      });
    
    }
  } catch (err) {
    res.status(500).json({
      message: "cannot create user",
      success: false,
    });
    console.log(err);
  }
};

export const signInUser = async (req: Request, res: Response, next:any) => {
  const { username, password } = req.body.firstTimeUser;
  const user = await User.findOne({ username: username });
  const validateUser = await bcrypt.compare(password, user.password);
 
  try {
    if (validateUser && user) {
      const sessionUser = {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      req.session.user = sessionUser;
      return res.status(200).json({
        message: "Log in Successful",
        data: sessionUser,
        success: true,
      });
    } else if (!validateUser || !user){
      return res.status(400).json({
        message: "User does not exist, Please sign up",
        success: false,
      });
     
    }
  } catch (e) {
    return res.status(500).json({
      message: "Server error, please try again",
      success: false,
    });
  }
 
};

export const logOutUser = async (req: Request, res: Response, next: any) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({
        message: "Log-out impossible at this moment. Please try again later",
        err,
        success: false,
      });
    } else {
      try {
        return res.status(200).json({
          message: "Log-out Successful",
          success: true,
        });
      } catch (err) {
        return res.status(500).json({
          message: "Server error, please check the server",
          success: false,
        });
      }
    }
  });
};

export const registerUserInfo = async (req: Request, res: Response) => {
  const { username } = req.params;
  const findUserProfile = await User.findOne({ username });
  if (findUserProfile) {
    try {
      res.status(200).json({
        message: "user profile info",
        success: true,
        data: findUserProfile,
      });
    } catch (err) {
      res.status(400).json({
        message: "cannot find user information",
        success: false,
      });
    }
  } else {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const UserProfileJpg = async (req: Request, res: Response) => {
  const userInSession = req.params.currentUser;

  const image = req.body.profileImage;
  if (userInSession === req.session.user.username) {
    const uploadAvaterImage = await User.updateOne(
      { username: userInSession },
      { avatar: image }
    );
    if (uploadAvaterImage.acknowledged) {
      const findUser = await User.findOne({ userInSession });
      try {
        res.status(200).json({
          message: "user profile info",
          success: true,
          data: findUser,
        });
      } catch (err) {
        res.status(400).json({
          message: "cannot find user information",
          success: false,
        });
      }
    } else {
      res.status(501).json({
        message: "Server Error, failed to upload image. please try again later",
        success: false,
      });
    }
  } else {
    res.status(500).json({
      message: "Server Error,  Please login to perform this action",
      success: false,
    });
  }
};
