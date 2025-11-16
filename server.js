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


const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, "public")));

const rebuild = process.argv[2] === "--rebuild";

sequelize.sync({ force: rebuild }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT} `));
});
