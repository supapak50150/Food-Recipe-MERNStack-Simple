const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  @route       POST http://localhost:5000/api/register
//  @desc        route register
//  @access      public
exports.createRegister = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ name }).exec();
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      name,
      password,
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //payload return jsonwebtoken เก็บข้อมูลเพื่อไปเข้ารหัส json
    const payload = {
      user: {
        name: user.name,
        role: user.role,
      },
    };

    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    // check error
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

//  @route       POST http://localhost:5000/api/login
//  @desc        route login
//  @access      public
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    // Check user
    let user = await User.findOneAndUpdate({ name }, { new: true }).exec();
    if (!user) {
      return res.status(400).json({ msg: "Username Invalid Credentials" });
    }

    // Compare Encrypt the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Password Invalid Credentials" });
    }

    //payload return jsonwebtoken
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    };
    console.log(payload);
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });
  } catch (err) {
    // check error
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

//  @route       POST http://localhost:8000/api/current-user
//  @desc        route current-user
//  @access      private
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.user.name })
      .select("-password")
      .exec();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

