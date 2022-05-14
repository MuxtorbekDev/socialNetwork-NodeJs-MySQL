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
      res.status(201).json({ xabar: "Siz ruyxatdan o'tdingiz" });
    });
    res.status(201).json(userObj);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const loginUser = (req, res) => {
  res.status(200).json({ msg: `Xush Kelibsiz ${req.user.first_name}` });
};

module.exports = { registerUser, loginUser, renderRegisterPage };
