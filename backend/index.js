require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import models
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UsersModel } = require("./model/UsersModel");

// Server setup
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// CORS configuration
app.use(cors({
  origin: "https://trading-dashboard-frontend.vercel.app",
  methods: ["POST", "GET", "DELETE"],
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit process if MongoDB connection fails
});

// Routes
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new order
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create new holding
app.post("/newHoldings", async (req, res) => {
  try {
    const newHolding = new HoldingsModel({
      name: req.body.name,
      qty: req.body.qty,
      avg: req.body.avg,
      price: req.body.price,
      net: req.body.net,
      day: req.body.day,
    });

    await newHolding.save();
    res.send("Holdings saved!");
  } catch (error) {
    console.error('Error saving holdings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete holdings
app.delete('/deleteHoldings', async (req, res) => {
  const { name, qty } = req.query;

  try {
    const deletedHolding = await HoldingsModel.findOneAndDelete({
      name,
      qty,
    });

    if (deletedHolding) {
      res.status(200).json({ message: 'Holding deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Holding not found' });
    }
  } catch (error) {
    console.error('Error deleting holding:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { name, mobile_no, password } = req.body;

  const newUser = new UsersModel({
    name,
    mobile_no,
    password,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'Login successful and data saved to DB' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// User signup
app.post('/api/signup', async (req, res) => {
  const { name, mobile_no, password } = req.body;

  const newUser = new UsersModel({
    name,
    mobile_no,
    password,
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'Signup successful and data saved to DB' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
