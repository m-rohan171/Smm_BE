const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const orderRoutes = require("./orderRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const paymentRoutes = require("./paymentRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/orders", orderRoutes);
router.use("/subscriptions", subscriptionRoutes);
router.use("/payments", paymentRoutes);

module.exports = router;
