const { check, validationResult }= require('express-validator');
const bodyparser = require('body-parser')
const express = require("express")
const path = require('path');
const { isModuleNamespaceObject } = require('util/types');
const app = express()

var PORT = process.env.port || 3000

// View Engine Setup
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get("/", function (req, res) {
	res.render("Form");
})

// check() is a middleware used to validate
// the incoming data as per the fields
app.post('/saveData', [
    check('first_name', 'Name length should be 2 to 20 characters')
					.isLength({ min: 5, max: 20 }),
    check('last_name', 'Name length should be 2 to 20 characters')
					.isLength({ min: 2, max: 20 }),
    check('age','age should be between 18 to 100')
                     .isLength({min:18,max:100}),
	check('email', 'Email length should be 7 to 30 characters')
					.isEmail().isLength({ min: 7, max: 30 }),
	check('pincode', 'Pincode number should contains 6 digits')
					.isLength({ min: 6, max: 6 }),
	
], (req, res) => {

	// validationResult function checks whether
	// any occurs or not and return an object
	const errors = validationResult(req);

	// If some error occurs, then this
	// block of code will run
	if (!errors.isEmpty()) {
		res.json(errors)
	}

	// If no error occurs, then this
	// block of code will run
	else {
		res.send("Successfully validated")
	}
});

app.listen(PORT, function (error) {
	if (error) throw error
	console.log("Server created Successfully on PORT ", PORT)
})
