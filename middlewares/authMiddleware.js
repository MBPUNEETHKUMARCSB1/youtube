const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "No token provided, access denied" });
  }

  try {
    console.log("first");
    const decoded = jwt.verify(token, "hibro");
    console.log("first");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

module.exports = authMiddleware;
