const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());
// MongoDB connection string
const mongoURI =
  "mongodb+srv://Sathyanarayana:zJG5z3RER5OSXtxL@cluster0.nukruar.mongodb.net/mentorlink?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Define a schema and model for Users
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  mentor: Boolean,
  profileImage: String,
  category: String,
  skills: [String],
  subCategory: [String],
});
const categorySchema = new mongoose.Schema({
  title: String,
});

const User = mongoose.model("users", userSchema);
const Category = mongoose.model("categories", categorySchema);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Define a route to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find()
      .select(
        "fname lname mentor profileImage category skills subCategory -_id"
      )
      .exec();

    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Define a route to fetch all users who are mentors
app.get("/users/mentors", async (req, res) => {
  try {
    const users = await User.find({ mentor: true })
      .select(
        "fname lname mentor profileImage category skills subCategory -_id"
      )
      .exec();

    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categoriesData = await Category.find({}, "title -_id").exec();
    const categories = categoriesData.map(
      (category) => category.toObject().title
    );

    return res.json(categories);
  } catch (err) {
    res.status(500).send("Error fetching categories");
  }
});

app.get("/:category/skills", async (req, res) => {
  const { category } = req.params;
  try {
    const categoryData = await Category.find({ title: category }).exec();
    if (!categoryData.length) {
      return res.status(404).send("Category not found");
    }
    const categoryObject = categoryData[0].toObject();
    const skills = categoryObject.skills;
    console.log(categoryData);
    if (!skills) {
      return res.json([]);
    }
    return res.json(skills);
  } catch (err) {
    console.error("Error retrieving skills:", err);
    res.status(500).send("Error retrieving skills");
  }
});

app.get("/users/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const users = await User.find({ category : category , mentor: true })
      .select(
        "fname lname mentor profileImage category skills subCategory -_id"
      )
      .exec();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
