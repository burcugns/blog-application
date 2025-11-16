const express = require("express");
const sequelize = require("./config/connection");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blog.html"));
});

const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, "public")));

const rebuild = process.argv[2] === "--rebuild";

// Test database connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
    return sequelize.sync({ force: rebuild });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Now listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    console.error("Starting server anyway...");
    // Start server even if database connection fails
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} (without database)`);
      console.log(`Now listening on http://localhost:${PORT}`);
    });
  });
