const Products = require("../models/Products");
const Order = require("../models/Order");

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .skip((req.query.page - 1) * req.query.perPage)
      .limit(req.query.perPage);
    console.log(orders)
    const total = await Order.countDocuments();
    return res.status(200).json({
      status: 200,
      data: orders,
      _meta: {
        currentPage: +req.query.page,
        perPage: +req.query.perPage,
        totalCount: total,
        pageCount: Math.ceil(total / req.query.perPage),
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.addOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      clientName: req.body.clientName,
      clientPhone: req.body.clientPhone,
    });
    if (req.body.products.length > 0) {
      const products = [];
      for (let id of req.body.products) {
        const findProduct = await Products.findById(id.id);
        if(findProduct) {
          findProduct.count = id.count
          products.push(findProduct)
        } else {
          return res.status(400).json({
            status: 400,
            message: "Bad request"
          })
        }
      }
      newOrder.products = products;
    } else {
      return res.status(400).json({
        status: 400,
        message: "Products is required"
      })
    }
    await newOrder.save();
    return res.status(200).json({
      status: 200,
      message: "New order accepted"
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const findOrder = await Order.findById(req.params.id)
    if(!findOrder) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }
    findOrder.status = req.body.status;
    await findOrder.save();
    return res.status(200).json({
      status: 200,
      data: findOrder,
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if(!deletedOrder) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Order Deleted"
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
}