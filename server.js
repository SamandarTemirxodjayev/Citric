const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/router");
const fs = require("fs");
const path = require("path");
require("./backup");
const video = require("./video");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("db error", err.message));

app.use(cors());

app.post("/", (req, res) => {
  return res.json({ message: "Server is run!" });
});

app.get("/video/:video", video);

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
app.listen(PORT, () => console.log(`server is running ${PORT}`));
