const express = require("express");
const { login, register, updateProfile,logout } = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
// const bcrypt = require("bcrypt");
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, updateProfile);
router.get("/logout", logout);
module.exports = router;