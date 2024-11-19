const express = require('express')
const connectDB = require('./config/db')
const app = express()
const universityRoutes = require('./routes/university.routes')
const facultyRoutes = require('./routes/faculty.routes')
const studentRoutes = require('./routes/student.routes')

app.use(express.json())
connectDB()

app.get('/', (req, res) => {
    res.send('University System')
})

app.use('/university', universityRoutes)
app.use('/faculty', facultyRoutes)
app.use('/student', studentRoutes)

app.listen(3000, () => {
    console.log('Server running on 3000');
})