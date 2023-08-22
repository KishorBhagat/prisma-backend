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