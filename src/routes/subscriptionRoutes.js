const express = require("express");
const {
  createSubscription,
  getSubscription,
} = require("../controllers/subscriptionController");
const router = express.Router();

router.post("/create", createSubscription);
router.get("/:subscriptionId", getSubscription);

module.exports = router;
