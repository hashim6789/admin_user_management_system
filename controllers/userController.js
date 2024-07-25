const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      let user = await UserModel.findOne({ email });
      if (
        user &&
        (await bcrypt.compare(password, user.password)) &&
        user.role === "User"
      ) {
        req.session.userId = user._id;
        res.redirect("/");
        // res.status(200).json({ message: "user login successfully" });
      } else {
        res.status(404).json({ message: "No user found the database!!!" });
      }
    } catch (err) {
      res.status(500).json({ message: "server error!!!" });
    }
  }

  if (req.method === "GET") {
    res.render("user/login", { msg: null });
  }
};

const signup = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;
      let user = await UserModel.findOne({ email });
      if (!user) {
        const hashPassword = await bcrypt.hash(password, 15);
        user = new UserModel({
          username,
          email,
          password: hashPassword,
        });

        await user.save();
        // res.redirect("/user/login");
        res.status(200).json({ message: "user sign up successful!!!" });
      } else {
        res.status(404).json({ message: "user is already exists in db..." });
        //   return res.redirect("/user/signup");
      }
    } catch (err) {
      res.status(500).json({ message: "server error!!!" });
    }
  }

  if (req.method === "GET") {
    res.render("user/signup", { msg: null });
  }
};

const home = (req, res) => {
  res.render("user/home");
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.clearCookie("connect.sid");
    console.log("The admin logout successfully!!!");
    res.redirect("/login");
    // res.status(200).json({ message: "User logout successfully!!!" });
  });
};

module.exports = { login, signup, home, logout };
