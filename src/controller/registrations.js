const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')


const registerUser = async (req, res) => {
    // Get the username and password from request body
    const {username, password} = req.body
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    bcrypt.hash(password, 12, async function(err, hash) {
        // Store hash in your password DB.
        // Save the user using the prisma user model, setting their password to the hashed version
        // Respond back to the client with the created users username and id
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hash
            }
        })
        console.log("this is newUser: ", newUser)
        console.log("this is hash: ", hash)

        res.status(201).json({ user: newUser })
    });
}

module.exports = {
    registerUser
}