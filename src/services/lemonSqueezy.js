const axios = require("axios");

const LEMON_SQUEEZY_API_BASE_URL = "https://api.lemonsqueezy.com/v1";
const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;

const lemonSqueezy = axios.create({
  baseURL: LEMON_SQUEEZY_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${LEMON_SQUEEZY_API_KEY}`,
    "Content-Type": "application/json",
  },
});



const createSubscriptionService = async (customerId, planId) => {
  try {
    const response = await lemonSqueezy.post("/subscriptions", {
      customer_id: customerId,
      plan_id: planId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

const getSubscriptionService = async (subscriptionId) => {
  try {
    const response = await lemonSqueezy.get(`/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw error;
  }
};

const createPaymentIntentForSqueezy = async (amount, currency) => {
  try {
    const response = await lemonSqueezy.post("/payment_intents", {
      amount,
      currency,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

module.exports = {
  createSubscriptionService,
  getSubscriptionService,
  createPaymentIntentForSqueezy,
};
