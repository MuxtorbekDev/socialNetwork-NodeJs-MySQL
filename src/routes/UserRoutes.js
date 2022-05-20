const express = require("express");
const {
  registerUser,
  loginUser,
  renderRegisterPage,
  logoutUser,
  renderLoginPage,
} = require("../controllers/UserController");
const catchAsync = require("../middlewares/tryCatchAsync");
const UserRouter = express.Router();
const passport = require("passport");
const { upload } = require("../middlewares/uploadImage");

UserRouter.get("/register", renderRegisterPage);
UserRouter.get("/login", renderLoginPage);
UserRouter.post("/register", upload.single("avatar"), catchAsync(registerUser));
UserRouter.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: false,
    failureRedirect: "/login",
  }),
  loginUser
);
UserRouter.get("/logout", logoutUser);

module.exports = UserRouter;
