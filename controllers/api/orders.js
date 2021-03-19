const models = require("../../models");

exports.getOrders = async (req, res, next) => {
  const orders = await models.Orders.getOrders(req.body.userId);
  res.json({
    orders: orders,
  });
};

exports.createOrder = async (req, res, next) => {
  const productsIds = (await models.Products.getProducts()).map(item => item.id);
  console.log(productsIds);

  if (!req.body.productId || products.includes(req.body.productId)) {
    return res.json({
      status: "Error",
      description: "Param `productId` missing or invalid!",
    });
  }
  await models.Orders.create(
    req.body.userId,
    req.body.productId,
    req.body.comment
  );
  res.json({});
};

exports.editOrder = async (req, res, next) => {
  await models.Orders.editOrder(
    req.params.id,
    req.body.product,
    req.body.comment
  );
  res.json({});
};

exports.deleteOrder = async (req, res, next) => {
  await models.Orders.deleteOrder(req.params.id);
  res.json({});
};
