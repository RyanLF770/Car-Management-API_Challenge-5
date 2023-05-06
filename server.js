const express = require('express')

var bodyParser = require('body-parser')

const app = express()
const port = 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const { getusers, Register, Login, Logout, registerAdmin, getusers } = require("./controllers/userController");
const { getcars, getDeletedcars, getcarById, deletecar, updatecar, createcar } = require('./controllers/carController')
const { verifyToken } = require("./middleware/VerifyToken")
const { getcars, getDeletedcars, updatecar, deletecar, createcar } = require('./controllers/carController')

const prefix = "/v1/api/";

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//user apis
app.get(prefix + "users", verifyToken, getusers);
app.post(prefix + "register", Register);
app.post(prefix + "Login", Login);
app.delete(prefix + "logout", Logout);
app.post(prefix + "registeradmin", verifyToken, registerAdmin);

//car apis
app.get(prefix + "cars", verifyToken, getcars);
app.get(prefix + "car/:id", verifyToken, getcarById);
app.get(prefix + "deletedcar", verifyToken, getDeletedcars);
app.put(prefix + "updatecar/:id", verifyToken, updatecar); // update car
app.put(prefix + "car/:id", verifyToken, deletecar); //delete car api
app.post(prefix + "createcar", verifyToken, createcar); //create car api

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})