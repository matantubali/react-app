const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config();


const app = express()

const PORT = process.env.SERVER_PORT;
const DB_URL = process.env.DB_CONNECT;

app.use(cors())
app.use(express.json())


mongoose.connect(DB_URL)
.then(() => console.log("Database connected"))


const TodoItemRoute = require('./routes/taskRoutes');
app.use('/', TodoItemRoute);


app.listen(PORT, () => {
    console.log(`Server is running`)
})