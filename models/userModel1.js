const mongoose = require("mongoose");
const userModel1 = new mongoose.Schema({
   task_no : String,
   date : String,
   work :String,
})
const task = mongoose.model("task", userModel1)
module.exports = task;