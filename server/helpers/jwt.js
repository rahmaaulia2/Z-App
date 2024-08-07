require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRETS = process.env.JWT_SECRET

const signToken = (user) => {
    return jwt.sign({id : user._id, username : user.username}, JWT_SECRETS)
}

const verifyToken = (access_token)=> { 
    return jwt.verify(access_token, JWT_SECRETS)
}

module.exports = {signToken, verifyToken}