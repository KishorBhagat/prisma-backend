const {generateJWTToken} = require('./authUtils')

const generateCookieToken = (user, res) => {
    const token = generateJWTToken(user.id);
    const options = {
        expires: new Date(Date.now() + 3 *24 *60 *60 *1000),
        httpOnly: true
    }
    user.password = undefined;
    return res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = generateCookieToken;