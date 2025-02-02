const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
   studentClass: {
      type: String,
      required: true

   }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;