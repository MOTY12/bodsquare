const mongoose = require("mongoose");
const {
  DBConnection,
  PostConnection
} = require("../config/db");

//HUNTERS DB MODELS IMPORT
const usersSchema = require("./users");
const postSchema = require("./post");

//Users DB MODELS
const userModel = DBConnection.model("Users", usersSchema);
const postModel = PostConnection.model("Posts", postSchema);

module.exports = {
  userModel,
  postModel,
};
