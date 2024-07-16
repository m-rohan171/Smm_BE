const express = require("express");
const {
  createOrder,
  getOrdersByUser,
} = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authenticate, createOrder);
router.get("/get", authenticate, getOrdersByUser);

module.exports = router;
