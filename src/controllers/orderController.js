const OrderModel = require("../models/Order");

const createOrder = async (req, res) => {
  const { platform, service, quantity, url } = req.body;
  try {
    const newOrder = new OrderModel({
      user: req.user.id,
      platform,
      service,
      quantity,
      url,
    });

    const order = await newOrder.save();
    res.status(200).json({
      status: 200,
      message: "Order Created Successfully",
      order: order,
    });
  } catch (error) {
    console.log("error is", error);
    res.status(500).send("Server Error");
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};
