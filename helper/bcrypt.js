const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
};

const checkPassword = async (incomingPassword, originalPassword) => {
  return await bcrypt.compare(incomingPassword, originalPassword);
};

module.exports = {
  encryptPassword,
  checkPassword,
};
