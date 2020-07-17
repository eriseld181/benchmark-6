
const express = require("express")

const dotenv = require('dotenv')
dotenv.config()
const listEndpoints = require("express-list-endpoints")
const cors = require("cors")
const port = process.env.PORT

const productRouter = require('./products/index.js')
const reviews = require('./reviews')
const server = express()
server.get("/", (req, res) => { res.send("the server is running") })

server.use(express.json())
server.use("/products", productRouter)
server.use("/reviews", reviews)

console.log(listEndpoints(server))

server.listen(port, () =>
    console.log(`Running on: ${port}`))