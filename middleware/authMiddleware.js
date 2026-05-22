const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      console.log("[Auth] Token decoded:", { id: decoded.id, role: decoded.role });

      next();
    } catch (error) {
      console.error("[Auth] Token verification failed:", error.message);
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token",
    });
  }
};

module.exports = { protect };