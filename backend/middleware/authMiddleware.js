require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("Request arrived");
  const token = req.headers["authorization"]?.split(" ")[1]; // because the string is -> "Bearer token"
  console.log(token)
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access.",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({
        message: "Unauthorized Access.",
      });
    }

    req.user = {
        id: verified.id,
        role: verified.role
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
        message: "Internal Server Error."
    })
  }
};

module.exports = authenticateToken;
