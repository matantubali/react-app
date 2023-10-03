const express = require('express')
const mongoose_db = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config();


const app = express()

const PORT: string | undefined = process.env.SERVER_PORT;
const DB_URL: string | undefined = process.env.DB_CONNECT;

app.use(cors())
app.use(express.json())


mongoose_db.connect(DB_URL)
.then(() => console.log("Database connected"))


const TodoItemRoute = require('./routes/taskRoutes');
app.use('/', TodoItemRoute);


app.listen(PORT, () => {
    console.log(`Server is running`)
})