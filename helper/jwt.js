const jwt = require("jsonwebtoken");

const SECRET_KEY = "fgjshkdjlfhbk3ur9iuh4u3yi7reruwgykh&uh47yiu$";

const createToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY);
};

const verifyToken = async( token) => {
  return jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return { err };
    return { userid: decoded.userid };
  });
};

module.exports = {
  createToken,
  verifyToken,
};
