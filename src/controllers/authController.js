const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  console.log("Registering user");
  const { username, email, password, isAdmin } = req.body;
  console.log("body is", req.body);
  try {
    console.log("finding if user already exists");
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      console.log("user already exists");
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("user does not exist");

    console.log("creating user");
    const createUser = new UserModel({ username, email, password, isAdmin });
    console.log("user created", createUser);

    const salt = await bcrypt.genSalt(10);
    console.log("generated salt", salt);
    createUser.password = await bcrypt.hash(password, salt);
    console.log("hashed password", createUser.password);

    await createUser.save();
    console.log("user saved");

    res
      .status(200)
      .json({ status: 200, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
};

const login = async (req, res) => {
  console.warn("Logging in user");
  const { email, password } = req.body;
  console.warn("body is", req.body);
  try {
    let user = await UserModel.findOne({ email });
    console.warn("user is", user);
    if (!user) {
      console.warn("user not found");
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    console.warn("user found");

    console.warn("checking password");
    const isMatch = await bcrypt.compare(password, user.password);
    console.warn("password checked");
    if (!isMatch) {
      console.warn("password is not correct");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.warn("password is correct");
    const payload = { user: { id: user.id } };
    console.warn("payload is", payload);

    jwt.sign(payload, "smm", { expiresIn: "8h" }, (err, token) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "You Have Logged in Successfully!",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token: token,
      });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  register,
  login,
};
