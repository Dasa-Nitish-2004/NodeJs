
// routes/user.js
const express = require("express")
const {model} = require("../model/user")
const route = express.Router()
route.get('/', async (req, res) => {
    try {
        const MyModel = await model()
        // console.log(MyModel) // Promise { Model { customer_details } }
        const users = await MyModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Error retrieving users');
    }
});

module.exports = route
