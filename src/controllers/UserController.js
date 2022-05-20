const { User } = require("../models/User");

const renderRegisterPage = (req, res) => {
  res.render("users/register");
};

const registerUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const userObj = await User.create(user);
    req.login(userObj, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/posts");
    });
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
};

const renderLoginPage = (req, res) => {
  res.render("users/login");
};

const loginUser = (req, res) => {
  res.redirect(307, "/posts");
};

const logoutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports = {
  registerUser,
  loginUser,
  renderRegisterPage,
  renderLoginPage,
  logoutUser,
};
