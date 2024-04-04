const Achievements = require("../models/Achievements");

exports.getAll = async (req, res) => {
  try {
    const achievements = await Achievements.find();
    return res.status(200).json({
      status: 200,
      data: achievements,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.addAchievements = async (req, res) => {
  try {
    const newAchievement = new Achievements({
      image: req.images
    })
    await newAchievement.save();
    return res.status(201).json({
      status: 201,
      data: newAchievement
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const updateAchievement = await Achievements.findByIdAndUpdate(req.params.id, { image: req.images}, { new: true });
    if(!updateAchievement) {
      return res.status(404).json({
        status: 404,
        message: "Achievement not found"
      })
    }

    return res.status(200).json({
      status: 200,
      data: updateAchievement,
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievements.findByIdAndDelete(req.params.id);
    
    if(!deletedAchievement) {
      return res.status(404).json({
        status: 404,
        message: "Achievement not found"
      })
    }

    return res.status(200).json({
      status: 200,
      message: "Achievement deleted",
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
}