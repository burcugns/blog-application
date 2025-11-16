const User = require("./user");
const Blog = require("./blog");

User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  Blog,
  User,
};
