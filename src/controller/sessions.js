const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')

const secret = process.env.JWT_SECRET

const checkLogin = async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;
    // Check that a user with that username exists in the database
    const result = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if(result){
        // Use bcrypt to check that the provided password matches the hashed password on the user
        bcrypt.compare(password, result.password, function(err, result) {
            // result == true
            if(result){
                // If the user exists and the passwords match, create a JWT containing the username in the payload
                // Use the JWT_SECRET environment variable for the secret key
                const token = jwt.sign({username}, secret)
                res.send({token})
            } else res.status(401).send('Invalid username or password')
        });
    } else res.status(401).send('Invalid username or password')
    // If either of these checks fail, respond with a 401 "Invalid username or password" error
    // Send a JSON object with a "token" key back to the client, the value is the JWT created
}

module.exports = {
    checkLogin
}