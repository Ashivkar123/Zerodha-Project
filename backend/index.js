require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Import routes and models
const authRoute = require("./Routes/AuthRoute");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

// Environment
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://zerodha-project-backend-1-2ouc.onrender.com",
  "https://zerodha-project-frontend-2.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ API Routes
app.use("/api", authRoute);

app.get("/api/allHoldings", async (req, res) => {
  const allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/api/allPositions", async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/api/allOrders", async (req, res) => {
  const allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/api/newOrder", async (req, res) => {
  const newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();
  res.send("Order Saved!");
});

// ✅ Serve dashboard UI (React build) from /dashboard
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "../dashboard/build"))
);

app.get("/dashboard/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/build", "index.html"));
});

// ✅ (Optional) Serve frontend if you want
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// ✅ Connect to MongoDB and start server
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
