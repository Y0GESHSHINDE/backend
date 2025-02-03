const mongoose = require("mongoose");

const teacherSchema =  new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   surname:{
      type:String,
      required:true
   },
   dob: {
      type: Date,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true

   },
   TeacherClass: {
      type: String,
      required: true

   }
})
const teacher = mongoose.model("Teacher", teacherSchema);

module.exports = teacher;