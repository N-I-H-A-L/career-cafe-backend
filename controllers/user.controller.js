import * as UserService from "../services/user.service.js";

export const registerUser = async (req, res) => {
  try {
    const registerUserParams = req.body;
    const createdUser = await UserService.registerUser(registerUserParams);

    res
      .status(201)
      .json(createdUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const loginUserParams = req.body;
    const user = await UserService.loginUser(loginUserParams);
    res.status(200).json(user);
  } catch (err) {
    res
      .status(401)
      .json({ error: err.message });
  }
};

export const protectedRoute = async (req, res) => {
  try {
    const result = await UserService.protectedRoute();
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const result = await UserService.sendOTP(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await UserService.resetPassword(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};