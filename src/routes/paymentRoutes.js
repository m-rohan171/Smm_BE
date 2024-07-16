const express = require("express");
const { createPaymentIntent } = require("../controllers/paymentController");
const router = express.Router();

router.post("/intent", createPaymentIntent);

module.exports = router;
