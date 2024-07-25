const express = require("express");
const {
  login,
  home,
  search,
  createUser,
  deleteUser,
  editUser,
  logout,
} = require("../controllers/adminController");
// const adminAuth = require("../middlewares/adminAuthentication");
const {
  isAuthenticated,
  isAdmin,
  redirectIfAuthenticated,
} = require("../middlewares/Auth");

const router = express.Router();

router.get("/login", redirectIfAuthenticated, login);
router.post("/login", redirectIfAuthenticated, login);

router.get("/", isAdmin, home);

router.post("/search", isAdmin, search);

router.post("/create-user", isAdmin, createUser);
router.post("/delete-user/:id", isAdmin, deleteUser);
router.post("/edit-user/:id", isAdmin, editUser);

router.get("/logout", isAdmin, logout);

module.exports = router;
