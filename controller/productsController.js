const Products = require("../models/Products");
const filterByLang = require("../utils/filterByLang")
const filterByLangSingle = require("../utils/filterByLangSingle")

exports.getAll = async (req, res) => {
  try {
    const products = await Products.find()
    const filteredTitle = filterByLang(products, req.query.lang, 'productTitle')
    const filteredAbout = filterByLang(filteredTitle, req.query.lang, 'about')
    const filteredAd = filterByLang(filteredAbout, req.query.lang, 'advantages')
    const filteredDesc = filterByLang(filteredAd, req.query.lang, 'description')
    return res.json({
      data: filteredDesc
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const findProduct = await Products.findById(req.params.id);

    if (!findProduct) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    const filteredTitle = filterByLangSingle(findProduct, req.query.lang, 'productTitle');
    const filteredAbout = filterByLangSingle(filteredTitle, req.query.lang, 'about');
    const filteredAd = filterByLangSingle(filteredAbout, req.query.lang, 'advantages');
    const filteredDesc = filterByLangSingle(filteredAd, req.query.lang, 'description');

    return res.status(200).json({
      status: 200,
      data: filteredDesc
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};



exports.search = async (req, res) => {
  try {
    const regex = new RegExp(req.params.title, 'i');
    const products = await Products.find()
    const filteredTitle = filterByLang(products, req.query.lang, 'productTitle')
    const filteredAbout = filterByLang(filteredTitle, req.query.lang, 'about')
    const filteredAd = filterByLang(filteredAbout, req.query.lang, 'advantages')
    const filteredDesc = filterByLang(filteredAd, req.query.lang, 'description')
    const result = filteredDesc.filter(product => regex.test(product.productTitle));
    res.status(200).json({
      status: 200,
      data: result
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
}
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Products({
      images: req.images,
      ...req.body,
    })
    await newProduct.save()
    return res.status(201).json({
      status: 201,
      message: "Product Created",
      data: newProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const findProduct = await Products.findById(req.params.id);

    if (!findProduct) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }
    if (req.images.length > 0) {
      for (image of req.images) {
        findProduct.images.push(image)
      }
    }

    findProduct.set(req.body);
    await findProduct.save()

    return res.status(200).json({
      status: 200,
      message: "Product Updated",
      data: findProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);

    if(!deletedProduct) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Product deleted"
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
}