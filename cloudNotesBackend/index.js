const connectToMongo= require("./db")
const express = require('express')
connectToMongo();

const app = express()
const port = 9000
app.use(express.json())

app.use("/api/auth",require('./Routes/auth'))
// app.use("/api/notes",User.js)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})