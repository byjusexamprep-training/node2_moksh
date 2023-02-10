const { isEmailValid } = require("../helper/validation.js");
const { getUserByEmail, createUser, addPassword } = require("../model/user");
const { encryptPassword } = require("../helper/bcrypt");
const { v4: uuidv4 } = require("uuid");

const registration = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (username === "" || password === "" || !isEmailValid(email)) {
      res.status(401).json({ message: "Invalid User Details" });
    }
    getUserByEmail(email)
      .then(async (user) => {
        if (user) {
          res.status().json({ message: "User already exists" });
          return;
        }
        const encryptedPassword = await encryptPassword(password);
        createUser({
          userid: uuidv4(),
          email,
          username,
          password: encryptedPassword,
        }).
        then((userData) => {
          addPassword({ email, password: encryptedPassword }).then(
            (passwordData) => {
                res.status(201).json({ success: true, message: "ok", userData });

            }
          );
        });
        
      })
      .catch((err) => {
        res.status(500).json( err );
      });
  } catch (err) {
    res.status(401).json( err );
  }
};



module.exports = {
  registration,
  
};
