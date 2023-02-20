const { isEmailValid } = require("../helper/validation.js");
const { getUserByEmail, createUser, addPassword } = require("../model/user");
const { getPasswordByEmail } = require("../model/auth_email");
const { encryptPassword, checkPassword } = require("../helper/crypt");
const { v4: uuidv4 } = require("uuid");
const { createToken, verifyToken } = require("../helper/jwt.js");
const { getCount, storeRequestDetails } = require("../model/usersRequests");

const registration = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (username === "" || password === "" || !isEmailValid(email)) {
      res.status(401).json({ message: "Invalid User Details" });
    }
    getUserByEmail(email)
      .then(async (user) => {
        console.log(user);
        if (!user.error) {
          res.status(401).json({ message: "User already exists" });
          return;
        }
        const encryptedPassword = encryptPassword(password);

        createUser({
          userid: uuidv4(),
          email,
          username,
          password: encryptedPassword,
        }).then((userData) => {
          addPassword({ email, password: encryptedPassword }).then(
            (passwordData) => {
              res.status(201).json({ success: true, message: "ok", userData });
            }
          );
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(401).json(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user.error) {
    res.status(404).json({ data: user.error });
    return;
  }

  getCount(email)
    .then((data) => {
      if (!data) {
        return res.status(400).send("Error");
      }
      if (data.count > 3) {
        return res.status(400).send({
          message: "Maximum tries exceeded, please try again after some time",
        });
      }
      storeRequestDetails(email)
        .then(async (data) => {
          const correctPassword = await getPasswordByEmail(email);
          const isLoggedIn = await checkPassword(password, correctPassword);
          if (!isLoggedIn) {
            res.status(403).json({ isLoggedIn });
            return;
          }
          const { userid } = user;
          const token = createToken({ userid });
          res.cookie("token", token);
          res.status(200).json({ isLoggedIn, token, user });
        })
        .catch((err) => {
          return res.json({ data: err });
        });
    })
    .catch((err) => {
      return res.json({ data: err });
    });
};

module.exports = {
  registration,
  login,
};
