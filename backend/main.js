import express from 'express';
import usersRouter from './users.js';
import cors from 'cors';
import mongoose from 'mongoose';

const port = 3001;
const app = express();

app.use(cors())
app.use(express.json());

await mongoose.connect('mongodb://127.0.0.1:27017/users')

app.get("/", (req, res) => {
    res.json({
        code: 200,
        message: "Hello, Express",
    });
});

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
})
