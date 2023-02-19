const express = require("express");
const { connection } = require("./db")
const {userroute}=require("./routes/user.routes")
const {noteroute}=require("./routes/note.routes")
const cors=require("cors");
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to backend")
})

app.use("/user",userroute);
app.use("/note",noteroute)

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(process.env.port, async () => {
    await connection;
    console.log(`Server running at 4040 ${process.env.port}`)
})