const models = require("../models");

exports.getOrders = async (req, res, next) => {
  if (req.session.userId) {
    const products = await models.Products.getProducts();
    const orders = await models.Orders.getOrders(req.session.userId);
    res.render("orders", {
      products: products,
      orders: orders,
      userName: req.session.userName
    });
  } else {
    res.redirect("/signin");
  }
};

exports.createOrder = async (req, res, next) => {
  await models.Orders.create(
    req.session.userId,
    req.body.product,
    req.body.comment
  );
  res.redirect("/orders");
};

exports.editOrder = async (req, res, next) => {
  await models.Orders.editOrder(
    req.params.id,
    req.body.product,
    req.body.comment
  );
  res.redirect("/orders");
};

exports.deleteOrder = async (req, res, next) => {
  await models.Orders.deleteOrder(req.params.id);
  res.redirect("/orders");
};
