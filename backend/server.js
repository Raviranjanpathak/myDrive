require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// CORS
app.use(cors({
  origin: "*"
}));

//  Middleware
app.use(express.json());

//  Static folder (important for images)
app.use("/uploads", express.static("uploads"));

//  Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/folders", require("./routes/folderRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

//  Server start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));