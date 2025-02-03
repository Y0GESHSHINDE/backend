const express = require("express");
const router = express.Router();
const teacher = require("../../models/teacher/teacherModels");

router.use(express.json());

router.post("/addTeacher", async (req, res) => {
   let { name, surname, dob, email, password, teacherClass } = req.body;

   if (!name || !surname || !dob || !email || !password || !teacherClass) {
      return res.status(400).json({ error: 'All fields are required' });
   }

   try {
      const cleanString = (str) => str.trim().toLowerCase();
      name = cleanString(name);
      surname = cleanString(surname);
      email = cleanString(email);
      teacherClass = cleanString(teacherClass);  // This will now map to TeacherClass in your model

      const isExist = await teacher.findOne({ email: email });

      if (isExist) {
         return res.status(400).json({ error: 'User already exists with this email' });
      }
      
      const newTeacher = new teacher({
         name,
         surname,
         dob,
         email,
         password,
         TeacherClass: teacherClass // Match the model field name
      });

      await newTeacher.save();
      res.status(200).json('Teacher added successfully');
   } catch (err) {
      res.status(500).send({ error: err.message });
   }
});

module.exports = router;
