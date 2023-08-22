const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoutes')

const port = process.env.PORT || 3000;
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Hello prisma");
})

app.use('/api', userRouter)

app.listen(port, () => {
    console.log("Server is running on port ", port)
})