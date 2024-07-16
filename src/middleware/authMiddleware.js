// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/User");
// require("dotenv").config();

// const authenticate = async (req, res, next) => {
//   const tokenHeader =
//     req.headers["authorization"] || req.headers["Authorization"];
//   console.log("token header is", tokenHeader);
//   const token = tokenHeader && tokenHeader.split(" ")[1];
//   console.log("token is", token);

//   if (!token) {
//     return res
//       .status(401)
//       .json({ status: 401, error: "Unauthorized: Missing token" });
//   }

//   try {
//     const decoded = jwt.verify(token, "smm");

//     const user = await UserModel.findOne({
//       where: { id: decoded.id },
//       attributes: [
//         "id",
//         "email",
//         "userName",
//         "isAdmin",
//         // "enable",
//         // "deleted",
//       ],
//     });

//     if (!user) {
//       return res
//         .status(401)
//         .json({ status: 401, error: "Unauthorized: Invalid token" });
//     }

//     req.user = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     };
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = { authenticate };
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const mongoose = require("mongoose");

// require("dotenv").config();

const authenticate = async (req, res, next) => {
  const tokenHeader =
    req.headers["authorization"] || req.headers["Authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, error: "Unauthorized: Missing token" });
  }

  try {
    const decoded = jwt.verify(token, "smm");
    var userId = new mongoose.Types.ObjectId(decoded.user.id);

    console.log("Decoded Token:", decoded); // Log the decoded token
    console.log("User ID:", userId); // Log the user ID

    const user = await UserModel.findOne({
      _id: userId,
      // enable: true,
      // deleted: false,
    });

    console.log("User:", user); // Log the user

    if (!user) {
      return res
        .status(401)
        .json({ status: 401, error: "Unauthorized: Invalid token" });
    }

    req.user = {
      id: user._id,
      userName: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = { authenticate };
