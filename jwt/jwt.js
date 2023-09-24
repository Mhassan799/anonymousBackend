const jwt = require("jsonwebtoken");
const secretKey = "Talha";

const jwtAuthorization = {
  sign(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  },
  refreshToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  },
  verifyToken(req, res, next) {
    const token = req.body.token; // Extract the token from the request body

    if (!token) {
      return res.status(401).json("No token");
    }

    try {
      const decode = jwt.verify(token, secretKey);
      req.userId = decode.user._id;
      // console.log(decode)
      next();
    } catch (e) {
      console.log(e);
      res.status(403).json("Token is not valid");
    }
  },
};
const { verifyToken, sign, refreshToken } = jwtAuthorization;
module.exports = { verifyToken, sign, refreshToken };
