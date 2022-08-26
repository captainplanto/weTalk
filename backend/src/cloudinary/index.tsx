import { v2 as cloudinary } from "cloudinary";
import express, { Request, Response } from "express";
import { config } from "dotenv";


config();
declare var process: {
  env: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEYS: string;
    CLOUDINARY_API_SECRET: string;
  };
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEYS,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };

export const CloudinaryMiddleware = async (
  req: Request,
  res: Response,
  next: any
) => {
  req.body.profileImage;
  if (!req.body.profileImage) {
    res.status(404).json({
      message: "Image not found",
    });
  } else {
    try {
      await cloudinary.uploader.upload(
        req.body.profileImage,
        {
          folder:'We-Talk',
         
          allowed_formats: ["png", "jpg", "jpeg", "svg"],
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            req.body.profileImage = result.secure_url;
          }
        }
      );
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

