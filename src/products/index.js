const express = require("express")
const db = require("../db")
const productRouter = express.Router()

//get all products
productRouter.get("/", async (req, res, next) => {
    try {
        const products = await db.query(`SELECT * FROM "Products" `)
        res.send(products.rows[0])

    } catch (error) {
        next(error)
    }
})

//get single product

productRouter.get("/:id", async (req, res, next) => {
    try {
        const products = await db.query(`SELECT * FROM "Products" WHERE _id = $1 `, [req.params.id])
        res.send(products.rows)

    } catch (error) {
        console.log(error)
        next("While reading product list a problem occurred!")
    }
})


productRouter.get("/:id/reviews", async (req, res, next) => {
    try {
        const students = await db.query(`SELECT
        "name",  _id, reviews_id, "comment"
    FROM
    public."Products"
    JOIN public."Reviews"
    ON _id  = "productId" WHERE _id = $1
    `, [req.params.id])
        res.send(students.rows)

    } catch (error) {
        console.log(error)
        next("While reading users list a problem occurred!")
    }
})

productRouter.post("/", async (req, res, next) => {
    try {
        const product = await db.query(`INSERT INTO "Products"(
             "name", "description", "brand", "imageUrl", "price", "category")
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; `, [req.body.name, req.body.description, req.body.brand, req.body.imageUrl, req.body.price, req.body.category])
        res.send(product.rows[0])

    } catch (error) {
        next(error)
    }
})
//edit products

productRouter.put("/:id", async (req, res, next) => {
    try {
        const product = await db.query(`UPDATE "Products"
        Set "name"=$1, "description"=$2, "brand"=$3, "imageUrl"=$4, "price"=$5, "category"=$6
        WHERE _id = $7 RETURNING *;
           `, [req.body.name, req.body.description, req.body.brand, req.body.imageUrl, req.body.price, req.body.category, req.params.id])
        res.send(product.rows[0])
    } catch (error) {
        next(error)
    }
})
//delete product
productRouter.delete("/:id", async (req, res, next) => {
    try {
        const students = await db.query(`DELETE FROM "Products"
        WHERE _id = $1  RETURNING *`, [req.params.id])
        res.send(students.rows[0])

    }
    catch (error) {
        next(error)
    }
})

module.exports = productRouter

