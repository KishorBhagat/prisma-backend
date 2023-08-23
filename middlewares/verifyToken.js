const prisma = require('../prisma/index');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if(!token) {
            return res.status(401).send({error: "Please authenticate/login using a valid token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });
        next();
    }
    catch (error) {
        res.status(500).json({error});
    }
}