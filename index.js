require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT  = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.json("Hello Mate!")
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})


