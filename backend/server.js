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

app.get("/skills", async (req, res) => {
  try {
    // Use the User model to aggregate skills
    const skillsAggregationResult = await User.aggregate([
      { $unwind: "$skills" }, // Unwind the skills array to deconstruct each skill into a document
      { $group: { _id: null, allSkills: { $addToSet: "$skills" } } }, // Group all skills into a single array, ensuring uniqueness
      { $project: { _id: 0, allSkills: 1 } } // Project only the skills array, excluding the _id field
    ]);

    // Extract the skills array from the aggregation result
    const skills = skillsAggregationResult[0]?.allSkills || [];

    // Return the skills array as JSON
    return res.json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err); // Log the error for debugging
    return res.status(500).send("Error fetching skills"); // Send a generic error message to the client
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

// app.get("/users/:category", async (req, res) => {
//   const { category } = req.params;
//   try {
//     const users = await User.find({ category : category , mentor: true })
//       .select(
//         "fname lname mentor profileImage category skills subCategory -_id"
//       )
//       .exec();
//     res.json(users);
//   } catch (err) {
//     res.status(500).send("Error fetching users");
//   }
// });

app.get("/users/skills/:skill", async (req, res) => {
  const { skill } = req.params;
  try {
    const users = await User.find({ 
      skills : {
        $regex: new RegExp(skill, 'i')
      },
      mentor: true
     })
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
