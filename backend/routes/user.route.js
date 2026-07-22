const express = require("express");
const { login, register, updateProfile,logout } = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { singleUpload } = require("../middlewares/multer.js");
// const bcrypt = require("bcrypt");
const router = express.Router();


router.post("/register",singleUpload, register);
router.post("/login", login);
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);
router.get("/logout", logout);
module.exports = router;