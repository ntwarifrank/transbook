import express from "express"
import dotenv from "dotenv"
import cors from "cors"

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("that is transbook backend route");
})

app.listen( PORT, () => {
    console.log(`App Was Running On THe Port Of http://localhost:${PORT}`);
})