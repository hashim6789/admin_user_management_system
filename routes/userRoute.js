const express = require("express");
const {
  login,
  signup,
  home,
  logout,
} = require("../controllers/userController");
// const userAuth = require("../middlewares/userAuthentication");
const {
  isAuthenticated,
  isAdmin,
  redirectIfAuthenticated,
} = require("../middlewares/Auth");

const router = express.Router();

router.get("/login", redirectIfAuthenticated, login);
router.post("/login", redirectIfAuthenticated, login);

router.get("/", isAuthenticated, home);

router.get("/signup", redirectIfAuthenticated, signup);
router.post("/signup", redirectIfAuthenticated, signup);

router.get("/logout", isAuthenticated, logout);

module.exports = router;
