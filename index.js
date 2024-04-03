require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB")
const app = express();
const Task = require('./models/Tasks')
const PORT  = process.env.PORT || 8000;
connectDB();
app.use(cors())

app.use(express.urlencoded( {extended: true}))
app.use(express.json());


// get all tasks

app.get('/api/tasks', async (req, res) => {
    try {
        const data = await Task.find({})

        if(!data) {
            throw new Error("An error occured while fetching tasks.")
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:"An error occured while fetching tasks." })
        
    }
})



app.get('/', (req, res) => {
    res.json(" Hello mate!")
})






app.get('*', (req, res) => {
 res.sendStatus("404")
})


app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})


