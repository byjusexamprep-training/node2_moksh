const { verifyToken } = require("../helper/jwt");

const verifyJWTToken = async(req, res, next) => {

 if( !req.headers.authorization ) {
    return res.status(403).json({ data: "User Invalid" });
  }
  const token  = req.headers.authorization.split(" ")[1]
  const  data  = await verifyToken(token);
  if (data.err) {
    return res.status(403).json({ data: "User token invalid" });
  }
  const { userid } = data
  const payload = { userid }
  req.session = payload
  next();
};

module.exports = { verifyJWTToken };
