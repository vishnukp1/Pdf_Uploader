const express = require("express");
const User= require("../controllers/userController");
const tryCatch = require("../middlewires/trycatch");

const router = express.Router();

router.post("/user/login",tryCatch(User.loginUser))
router.post("/user/singup", tryCatch(User.createUser));

module.exports = router; 