import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../models/user.model";
export const router = express.Router();
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GOOGLE_MAIL_USERNAME,
    //create AppPassword in google
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  secure: true,
});

//Register User using has, bcrypt && salt methodss.

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, username, dob, email, password } =
    req.body.firstTimeUser;
  if (
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    dob === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(404).json({
      message: "One or more of the inputs are empty",
      success: false,
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 16);
    const newUser = new User({
      firstName,
      lastName,
      username,
      dob,
      email,
      password: hashPassword,
    });
    const exisitingUserName = await User.findOne({ username: username });
    const exisitingEmail = await User.findOne({ email: email });
    try {
      if (!exisitingUserName && !exisitingEmail) {
        const savedNewUser = await newUser.save();
        const mailData = {
          from: process.env.GOOGLE_MAIL_USERNAME,
          to: email,
          subject: "Welcome to WeTalk",
          text: "Welcome to weTalk Community",
          html: `Hey ${firstName} ${lastName}! Welcome to WeTalk, create topics and like posts`,
        };
        transporter.sendMail(mailData, (error, data) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
          }
        });
        res.status(200).json({
          message: `New user, ${firstName}  ${lastName} was succesfully created successfully`,
          success: true,
          data: savedNewUser,
        });
      } else {
        res.status(400).json({
          message: "Incorrect username or password, please try again",
          success: false,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "cannot create User",
        success: false,
      });
      console.log(err);
    }
  }
};

export const signInUser = async (req: Request, res: Response, next: any) => {
  const { username, password } = req.body.firstTimeUser;
  if (username === "" || password === "") {
    res.status(404).json({
      message: "One or more of the inputs are empty",
      success: false,
    });
  } else {
    const user = await User.findOne({ username: username });
    const validateUser = await bcrypt.compare(password, user.password);

    try {
      if (validateUser && user) {
        const sessionUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar:user.avatar,
        };
        req.session.user = sessionUser;
        return res.status(200).json({
          message: "Log in Successful",
          data: sessionUser,
          success: true,
        });
      } else if (!validateUser || !user) {
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
  const username  = req.params.username;
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
