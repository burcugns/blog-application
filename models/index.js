const Category = require("./category");
const User = require("./user");
const Blog = require("./blog");

Blog.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(Blog, {
  foreignKey: "categoryId",
  as: "blogs",
});

User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  Blog,
  Category,
  User,
};
