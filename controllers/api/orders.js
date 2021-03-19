const models = require("../../models");

exports.getOrders = async (req, res, next) => {
  const orders = await models.Orders.getOrders(req.body.userId);
  res.json({
    status: "Successful",
    orders: orders,
  });
};

exports.createOrder = async (req, res, next) => {
  const isProductExist = (await models.Products.findById(req.body.productId))
    ? true
    : false;

  if (!req.body.productId || isProductExist === false) {
    return res.json({
      status: "Error",
      description: "Param `productId` missing or invalid!",
    });
  } else {
    const newOrder = await models.Orders.create(
      req.body.userId,
      req.body.productId,
      req.body.comment
    );

    return res.json({
      status: "Successful",
      createdOrderId: newOrder[0].insertId,
    });
  }
};

exports.editOrder = async (req, res, next) => {
  const orderToEdit = await models.Orders.getOrderById(req.params.id);
  if (!orderToEdit) {
    return res.json({
      status: "Error",
      description: "Order doesn't exist!",
    });
  }

  if (orderToEdit.userId !== req.body.userId) {
    return res.json({
      status: "Error",
      description: "No access!",
    });
  }

  if (!req.body.productId) {
    return res.json({
      status: "Error",
      description: "Required param `productId` missed",
    });
  }

  await models.Orders.editOrder(
    orderToEdit.id,
    req.body.productId,
    req.body.comment
  );
  res.json({
    status: "Successful",
    description: `Order №${orderToEdit.id} was edited`,
  });
};

exports.deleteOrder = async (req, res, next) => {
  const orderToDelete = await models.Orders.getOrderById(req.params.id);
  if (!orderToDelete) {
    return res.json({
      status: "Error",
      description: "Order doesn't exist!",
    });
  }

  if (orderToDelete.userId !== req.body.userId) {
    return res.json({
      status: "Error",
      description: "No access!",
    });
  }

  await models.Orders.deleteOrder(req.params.id);

  res.json({
    status: "Successful",
    description: `Order №${orderToDelete.id} was deleted`,
  });
};
