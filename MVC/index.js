const express = require("express")
const userRoutes = require("./routes/users")
const {getConnection} = require("./connection")
const app = express()

let port = 3000
getConnection("mongodb://127.0.0.1:27017/Flight_info")
app.use(express.urlencoded({ extended: true }));
app.use('/users',userRoutes)

app.listen(port,()=>{console.log("hari bol")})