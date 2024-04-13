const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/router");
const fs = require("fs");
const useragent = require('express-useragent');
const video = require("./video")
const path = require("path");
require("./backup");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(useragent.express());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("db error", err.message));

app.use(cors());

app.get("/", (req, res) => {
  const device = req.useragent.isMobile ? (req.useragent.isAndroid ? 'Android' : (req.useragent.isiPhone ? 'iOS' : 'Mobile')) : 'Desktop';
  return res.json({ 
    device: device,
    message: "Server is run!"
  });
});

const logFolder = path.join(__dirname, "log");
const logFileName = () => {
  const now = new Date();
  const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()}`;
  return path.join(logFolder, `${formattedDate}.mongodb.log`);
};
fs.mkdirSync(logFolder, { recursive: true });
let logStream = fs.createWriteStream(logFileName(), { flags: "a" });
mongoose.set("debug", (collectionName, method, query, doc) => {
  const logMessage = `[${new Date().toISOString()}] ${collectionName}.${method} ${JSON.stringify(
    query
  )} ${JSON.stringify(doc)}\n`;
  if (logStream.path !== logFileName()) {
    logStream.end();
    logStream = fs.createWriteStream(logFileName(), { flags: "a" });
  }

  logStream.write(logMessage);
});

app.use(routes);
app.use("/uploads", express.static("uploads"));

app.get("/video/:video", video);

app.listen(PORT, () => console.log(`server is running ${PORT}`));
