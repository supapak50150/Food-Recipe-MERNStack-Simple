const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { createRegister, login, currentUser } = require("../controllers/auth");

//middleware
const { auth, userCheck } = require("../middleware/auth");

//  @route       POST http://localhost:5000/api/register
//  @desc        route register
//  @access      public
router.post("/register", createRegister);

//  @route       POST http://localhost:5000/api/login
//  @desc        route login
//  @access      public
router.post("/login", login);

//  @route       POST http://localhost:5000/api/current-user
//  @desc        route current-user
//  @access      private
router.post("/current-user", auth, userCheck, currentUser);

module.exports = router;
