const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection
mongoose.connect(
  "mongodb+srv://portfolioUser:ramya44@portfolio.uwmcvjz.mongodb.net/?appName=portfolioDB"
)
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.error("MongoDB Connection Error:", err));

// Additional diagnostic listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose event: connected');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose event: error', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose event: disconnected');
});

// Schema (Structure of data)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

// Model
const User = mongoose.model("User", UserSchema);

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch(err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User saved to MongoDB" });
  } catch(err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
