const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
})
const user = mongoose.model("user", userModel)
module.exports = user;