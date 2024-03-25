const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { createRegister, login, currentUser } = require("../controllers/auth");
// const { createRegister, login } = require("../controllers/auth");

//middleware
// const { auth } = require("../middleware/auth");
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
// router.post("/current-user");
// router.post("/current-user", auth);
// router.post("/current-user", auth, currentUser);
router.post("/current-user", auth, userCheck, currentUser);

/* http://localhost:5000/api/register */
// router.get('/register', createRegister)
/* http://localhost:5000/api/login */
// router.get('/login', login)

module.exports = router;
