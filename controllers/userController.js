const prisma = require('../prisma/index.js');

const generateCookieToken = require('../utils/generateCookieToken.js');

// User Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({error: { message: "please provide name, email and password" }});
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
        res.status(500).json({error});
    }
}

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({error: { message: "please provide email and password" }});
        }
        // Find a user based on email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        // When there is no user
        if(!user) {
            res.status(400).json({ error: { message: "Invalid Credentials!" } });
        }
        if(user.password !== password) {
            res.status(400).json({ error: { message: "Invalid Credentials!" } });
        }
        generateCookieToken(user, res);
    } catch (error) {
        res.status(500).json({error});
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({success: true});
    } catch (error) {
        res.status(500).json({error});
    }
}