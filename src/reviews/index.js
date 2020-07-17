const express = require("express")
const db = require("../db")
const reviewRouter = express.Router()

//get all Reviews
reviewRouter.get("/", async (req, res, next) => {
    try {
        const products = await db.query(`SELECT * FROM "Reviews" `)
        res.send(products.rows)

    } catch (error) {
        next(error)
    }
})

//get single product

reviewRouter.get("/:id", async (req, res, next) => {
    try {
        const rew = await db.query(`SELECT * FROM "Reviews" WHERE reviews_id = $1 `, [req.params.id])
        res.send(rew.rows)

    } catch (error) {
        console.log(error)
        next("While reading product list a problem occurred!")
    }
})



reviewRouter.post("/", async (req, res, next) => {
    try {
        const product = await db.query(`INSERT INTO "Reviews"(
             "comment", "rate", "productId")
            VALUES ($1, $2, $3) RETURNING *; `, [req.body.comment, req.body.rate, req.body.productId])
        res.send(product.rows[0])

    } catch (error) {
        next(error)
    }
})
//edit products

reviewRouter.put("/:id", async (req, res, next) => {
    try {
        const product = await db.query(`UPDATE "Reviews"
        Set "comment"=$1, "rate"=$2, "productId"=$3
        WHERE reviews_id = $4 RETURNING *;
           `, [req.body.comment, req.body.rate, req.body.productId, req.params.id])
        res.send(product.rows[0])
    } catch (error) {
        next(error)
    }
})
//delete product
reviewRouter.delete("/:id", async (req, res, next) => {
    try {
        const students = await db.query(`DELETE FROM "Reviews"
        WHERE reviews_id = $1  RETURNING *`, [req.params.id])
        res.send(students.rows[0])

    }
    catch (error) {
        next(error)
    }
})

module.exports = reviewRouter

