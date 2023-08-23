const prisma = require('../prisma/index.js');

const generateCookieToken = require('../utils/generateCookieToken.js');

// User Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error('please provide all fields');
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        })
        generateCookieToken(user, res);
    } catch (error) {
        throw new Error(error);
    }
}

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Please provide email and password');
        }
        // Find a user based on email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // When there is no user
        if(!user) {
            throw new Error('User not found');
        }
        if(user.password !== password) {
            throw new Error('Invlaid password');
        }
        generateCookieToken(user, res);
    } catch (error) {
        throw new Error(error);
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({success: true});
    } catch (error) {
        throw new Error(error);
    }
}