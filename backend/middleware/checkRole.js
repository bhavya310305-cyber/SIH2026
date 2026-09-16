const checkRole = (allowed_role) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role != allowed_role) {
        return res.status(403).json({
          message: "Unauthorized Access.",
        });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error.",
      });
    }
  };
};

module.exports = checkRole;
