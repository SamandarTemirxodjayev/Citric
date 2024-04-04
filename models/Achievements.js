const mongoose = require("mongoose");

const AchievementsSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
});

const Achievements = mongoose.model("Achievements", AchievementsSchema);

module.exports = Achievements;
