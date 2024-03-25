// check login jsonwebtoken
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers["authtoken"]; 

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //verify the token
  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.userCheck = async (req, res, next) => {
  const { name } = req.user;
  const roleUser = await User.findOne({ name }).exec();
  if (roleUser.role !== "user") {
    res.status(403).json({ err: "user access denied" });
  } else {
    next();
  }
}; 

