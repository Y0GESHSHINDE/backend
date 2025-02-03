const express = require("express");
const router = express.Router();
const student = require("../../models/student/studentModels")

// router.use(express.json());

// api to create student
router.post("/addStudent", async (req, res) => {
   let { name, surname, dob, email, password, studentClass } = req.body;

   if (!name || !surname || !dob || !email || !password || !studentClass) {
      return res.status(400).json({ error: 'All fields are required' });
   }
   try {
      const cleanString = (str) => str.trim().toLowerCase();
      name = cleanString(name);
      surname = cleanString(surname);
      email = cleanString(email);
      studentClass = cleanString(studentClass);
      const existingStudent = await student.findOne({ email: email });

      if (existingStudent) {
         return res.status(400).json({ error: 'User already exists with this email' });
      }
      const newStudent = new student({
         name,
         surname,
         dob,
         email,
         password,
         studentClass
      });

      await newStudent.save();  // Save the student to the database
      res.status(200).json('Student added successfully');
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// api to get student by name and email
router.get("/getStudentByNameAndEmail", async (req, res) => {
   try {
      let { name, email } = req.query; // ✅ Use req.query for GET requests

      if (!name && !email) {
         return res.status(400).json({ message: "Name or email is required" });
      }

      const cleanString = (str) => str?.trim().toLowerCase();
      name = cleanString(name);
      email = cleanString(email);

      const studentData = await student.findOne({
         $or: [
            name ? { name: name } : null,  // ✅ Only include if name exists
            email ? { email: email } : null // ✅ Only include if email exists
         ].filter(Boolean) 
      });

      if (!studentData) {
         return res.status(404).json({ message: 'Student not found' });
      }

      res.status(200).json(studentData);
   } catch (error) {
      res.status(500).json({ error: error.message }); 
   }
});

// api to update student using id 
router.patch("/updateStudent", async (req, res) => {
   const { id } = req.query; // Get ID from query params
   if (!id) {
       return res.status(400).json({ message: "ID is required" });
   }
   try {
       const updatedStudent = await student.findByIdAndUpdate(id , req.body , {lean:true});
       if (!updatedStudent) {
           return res.status(404).json({ message: "Student not found" });
       }
       res.status(200).json("Student updated successfully");
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
});

// api to delete student using id
router.delete("/deleteStudent", async (req, res) => {
   const { id } = req.query; // Get ID from query params
   if (!id) {
       return res.status(400).json({ message: "ID is required" });
   }
   try {
       const deletedStudent = await student.findByIdAndDelete(id);
       if (!deletedStudent) {
           return res.status(404).json({ message: "Student not found" });
       }
       res.status(200).json("Student deleted successfully");
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
});



module.exports = router;