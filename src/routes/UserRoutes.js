const express = require("express");
const {
  registerUser,
  loginUser,
  renderRegisterPage,
} = require("../controllers/UserController");
const { upload } = require("../middlewares/uploadImage");
const catchAsync = require("../middlewares/tryCatchAsync");
const UserRouter = express.Router();
const passport = require("passport");

UserRouter.get("/register", renderRegisterPage);
UserRouter.post("/register", catchAsync(registerUser));
UserRouter.post(
  "/login",
  passport.authenticate(
    "local",
    { failureFlash: false, failureRedirect: "/" },
    loginUser
  )
);

module.exports = UserRouter;
