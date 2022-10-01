import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { postChat, postUser, userGet } from "./controller/user.controller.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 6060

// middleWare
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: "*",
    optionsSuccessStatus: "200"
}))


// Routing
app.get("/user/:id", userGet)
app.post("/login", postUser)
app.post("/postChat/:id", postChat)
app.all("/*", (_, res) => res.sendStatus(500))
app.listen(PORT, console.log(6060))