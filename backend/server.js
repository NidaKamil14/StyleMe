const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth/authRoutes");
require("./config/db");

const clothesRoutes = require("./routes/clothesRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/clothes", clothesRoutes);

app.get("/", (req, res) => {
  res.send("StyleMe Backend Running...");
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});