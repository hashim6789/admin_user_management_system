const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const admin = {
  _id: "admin123321",
  email: "admin@gmail.com",
  password: "123456",
  role: "Admin",
};

/*--------------admin/login------------*/
const login = (req, res) => {
  // post - admin/login
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (admin.email === email && admin.password === password) {
      req.session.adminId = admin._id;
      // return res.status(200) .json({ message: "The admin login successfully..." });
      return res.redirect("/admin/");
    }
    res.redirect("/admin/login");
  }

  //get - admin/login
  if (req.method === "GET") {
    // console.log("testing 1");
    res.render("admin/login", { msg: null });
  }
};

/**--------admin/home------- */
const home = async (req, res) => {
  try {
    const query = req.query.query || "";
    let users = [];
    if (query) {
      users = await UserModel.find({ username: new RegExp(query, "i") });
    } else {
      users = await UserModel.find({});
    }
    res.render("admin/home", { users: users });
  } catch (err) {
    res.status(500).json({ message: "The server Error" });
  }
};

/**--------admin/search------- */
const search = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { query } = req.body;

      // return res.status(200).json({data: query,});
      return res.redirect(`/admin/?query=${query}`);
    } catch (err) {
      res.status(500).json({ message: "The server Error" });
    }
  }
};

/**--------admin/create-user------- */
const createUser = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;
      let user = await UserModel.findOne({ email });
      if (!user) {
        console.log(`create testing`);
        const hashPassword = await bcrypt.hash(password, 15); //for decode the password
        user = new UserModel({
          username,
          email,
          password: hashPassword,
        });

        await user.save();
        console.log(`admin created a new user...`);
        // return res.status(201).json({ message: "the new user created" });
        return res.redirect("/admin/");
      }
      console.log("user existed!!!");
      return res.redirect("/admin/");
    } catch (err) {
      res.status(500).json({ message: "The server Error" });
    }
  }
};

/**--------admin/delete-user------- */
const deleteUser = async (req, res) => {
  if (req.method === "POST") {
    try {
      const userId = req.params.id; //take the id from the url params
      const deletedUser = await UserModel.findByIdAndDelete(userId); //find the user by id and delete it.

      if (!deletedUser) {
        console.log("The user not found in db");
        return res.status(404).json({ message: "The user not found in db" });
      }
      console.log("admin deleted a user...");
      // return res
      //   .status(200)
      //   .json({ message: "The user deleted successfully..." });
      return res.status(200).redirect("/admin/");
    } catch (err) {
      res.status(500).json({ message: "The server Error" });
    }
  }
};

/**--------admin/delete-user------- */
const editUser = async (req, res) => {
  if (req.method === "POST") {
    try {
      const userId = req.params.id; //for _id
      const { username, email } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "the user not found" });
      }
      console.log("The admin edited a user");
      // return res.status(200).json({ message: "The Admin edited a user..." });
      return res.status(200).redirect("/admin/");
    } catch (err) {
      res.status(500).json({ message: "The server Error" });
    }
  }
};

/**----------admin/logout----------- */
const logout = (req, res) => {
  //get - /admin/logout
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.clearCookie("connect.sid");
    console.log("The admin logout successfully!!!");
    res.redirect("/admin/login");
    // res.status(200).json({ message: "Admin logout successfully!!!" });
  });
};
module.exports = {
  login,
  home,
  search,
  createUser,
  deleteUser,
  editUser,
  logout,
};
