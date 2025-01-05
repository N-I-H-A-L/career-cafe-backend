import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerUser = async (registerUserParams) => {
  try {
    const { email, password } = registerUserParams;

    const findUser = await User.findOne({ email });
    if (findUser) {
      throw new Error("User with email already exists");
    }
    const createdUser = new User(registerUserParams);
    await createdUser.save();

    return createdUser;
  } catch (err) {
    throw new Error(`Error in registering user, ${err.message}`);
  }
};

export const loginUser = async (loginUserParams) => {
  try {
    const { email, password } = loginUserParams;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("User with email doesn't exist");
    }

    const isPasswordCorrect = await findUser.matchPassword(password);

    if (!isPasswordCorrect) {
      throw new Error("Wrong password");
    }

    const token = jwt.sign(
      { id: findUser._id, email: findUser.email, role: "admin" },
      process.env.SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );

    return {
      user: findUser,
      token,
    };
  } catch (err) {
    throw new Error(`Error in logging in, ${err.message}`);
  }
};

export const protectedRoute = async () => {
  try {
    return {
      message: "Accessed protected route",
    };
  } catch (err) {
    throw new Error(`Error in accessing protected route, ${err.message}`);
  }
};

export const sendOTP = async (sendOTPParams) => {
  try {
    const { email } = sendOTPParams;
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Password Reset Request",
      text: `OTP to reset your password: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return { message: "OTP sent to email" };
  } catch (err) {
    throw new Error(`Error in sending OTP to mail, ${err.message}`);
  }
};

export const resetPassword = async (resetPasswordRequestParams) => {
  try {
    const { email, newPassword, otp } =
      resetPasswordRequestParams;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (
      otp == user.otp
    ) {
      user.password = newPassword;
      await user.save();
    } else {
      throw new Error("Invalid OTP");
    }

    return { message: "Password has been updated" };
  } catch (err) {
    throw new Error(`Error in updating password, ${err.message}`);
  }
};
