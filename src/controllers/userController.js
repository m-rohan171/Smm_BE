const { default: mongoose } = require("mongoose");
const UserModel = require("../models/User");

const bcrypt = require("bcryptjs");

const updateProfile = async (req, res) => {
  const { username, email, currentPassword, newPassword, confirmPassword } =
    req.body;
  const userId = req.user.id;

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the current password is correct (only if newPassword is provided)
    if (newPassword) {
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }

      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res
          .status(400)
          .json({ msg: "New password and confirm password do not match" });
      }
    }

    // Update the user's information
    user.username = username || user.username;
    user.email = email || user.email;

    // Hash the new password if provided
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    res.status(200).json({
      message: "Profile Updated Successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const viewProfile = async (req, res) => {
  try {
    console.log("user making req is", req.user);
    const userId = req.user.id;
    const user = await UserModel.findOne({ _id: userId }, { password: 0 });
    if (user) {
      res
        .status(200)
        .json({ data: user, status: 200, message: "user fetch successfully" });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteProfile = async (req, res) => {
  try {
    console.log("user making req is", req.user);
    const userId = req.user.id;
    const user = await UserModel.findOneAndDelete({ _id: userId });
    if (user) {
      res.status(200).json({
        data: user,
        status: 200,
        message: "acoount deleted succesfully",
      });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  updateProfile,
  viewProfile,
  deleteProfile,
};
