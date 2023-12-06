
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  let token = req.headers["authorization"]
  
  if (!token) {
    return res.status(401).json({
      message: "Access denied. You are not authorized on this route. Provide a token.",
    });
  }
  
  token = token.split(" ")[1]
  try {
    const tokenData = jwt.verify(token, "SECRET123")
    req.user = {
      id: tokenData.id,
      email: tokenData.email,
    }
    next()
  } catch (e) {
    // Use a switch statement to handle different error cases
    switch (e.name) {
      case "JsonWebTokenError":
        return res.status(401).json({
          message: "Invalid token",
        });
      case "TokenExpiredError":
        return res.status(401).json({
          message: "Token expired",
        });
      default:
        return res.status(500).json({
          message: "Internal server error",
        })
    }
  }
}

module.exports = authenticate;
