const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.error("[Auth] Missing user or role:", req.user);
      return res.status(403).json({
        message: "User role not found",
      });
    }

    if (!roles.includes(req.user.role)) {
      console.error(
        `[Auth] Role '${req.user.role}' not in allowed roles [${roles.join(", ")}]`
      );
      return res.status(403).json({
        message: `Access Denied. Your role is '${req.user.role}', but this action requires: ${roles.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = authorizeRoles;