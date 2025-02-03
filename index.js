const express = require("express"); // Import Express
const connectDB = require('./src/config/db');
const Student = require('./src/api/student/StudentApi');
const teacher = require('./src/api/teacher/TeacherApi.js')
const app = express(); 

app.use(express.json());

connectDB();

// app.use('/api/student', Student);
app.use('/api/teacher', teacher);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
