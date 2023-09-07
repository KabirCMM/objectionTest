const jwt = require('jsonwebtoken')
const secret = require('../config')

function setUser( user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secret.jwtSecret)
}

function getUser(token) {
    if (! token) return null;
    try{
        return jwt.verify(token, secret.jwtSecret)
        
    } catch(error) {
        return null
    }


}

module.exports = {
    setUser,
    getUser,
}