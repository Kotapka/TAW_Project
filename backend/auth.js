
const auth = (req, res, next) => {
  let token = req.headers["x-auth-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  next();
};

module.exports = auth;