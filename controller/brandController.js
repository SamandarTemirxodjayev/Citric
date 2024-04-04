const Brands = require("../models/Brands");

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brands.find();
    return res.status(200).json({
      status: 200,
      data: brands,
    });
  } catch (err) {
    return res.json({
      message: "Interval Server error!",
      error: err.message,
    });
  }
};

exports.addBrand = async (req, res) => {
  try {
    const newBrand = new Brands({
      image: req.images,
    });
    await newBrand.save();
    return res.status(200).json({
      status: 200,
      data: newBrand,
    });
  } catch (err) {
    return res.json({
      message: "Interval Server error!",
      error: err.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const findBrand = await Brands.findById(req.params.id);

    if (!findBrand) {
      return res.status(404).json({
        status: 404,
        message: "Brand Not Found",
      });
    }

    findBrand.image = req.images;
    await findBrand.save();

    return res.status(200).json({
      status: 200,
      data: findBrand,
    });
  } catch (err) {
    return res.json({
      message: "Interval Server error!",
      error: err.message,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brands.findByIdAndDelete(req.params.id);
    
    if (!deletedBrand) {
      return res.status(404).json({
        status: 404,
        message: "Brand Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Brand deleted"
    })
  } catch (err) {
    return res.json({
      message: "Interval Server error!",
      error: err.message,
    });
  }
}