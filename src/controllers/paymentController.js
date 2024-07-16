const { createPaymentIntentForSqueezy } = require("../services/lemonSqueezy");

const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await createPaymentIntentForSqueezy(amount, currency);
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};

module.exports = {
  createPaymentIntent,
};
