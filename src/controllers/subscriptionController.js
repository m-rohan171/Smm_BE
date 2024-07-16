const {
  createSubscriptionService,
  getSubscriptionService,
} = require("../services/lemonSqueezy");

const createSubscription = async (req, res) => {
  const { customerId, planId } = req.body;
  try {
    const subscription = await createSubscriptionService(customerId, planId);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subscription" });
  }
};

const getSubscription = async (req, res) => {
  const { subscriptionId } = req.params;
  try {
    const subscription = await getSubscriptionService(subscriptionId);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subscription" });
  }
};

module.exports = {
  createSubscription,
  getSubscription,
};
