import express from "express";
import postRouter from "./posts.js";
import { Users } from "./util.js";
import { Posts } from "./util.js";
import { v4 as uuidv4 } from 'uuid';

const usersRouter = express.Router();

postRouter.mergeParams = true;
usersRouter.use("/:user_id/posts", postRouter);

usersRouter.get('/', async (req, res) => {
    const users = await Users.find();

    res.send(users);
});

usersRouter.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    try {
        const user = await Users.findOne({ _id: userId });
        
        if (user === null) {
            res.status(404);
            res.json({
                status: 404,
                message: 'not found',
            });
            return;
        }
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
});

usersRouter.post("/", async (req, res) => {
    const requestBody = req.body;
    requestBody._id = uuidv4();

    try {
        const result = await new Users(requestBody).save();
        res.status(201);
        res.json({
            status: 201,
            message: 'created',
        });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            status: 500,
            message: e,
        });
    }
});

usersRouter.delete('/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        const result = await Users.findOneAndDelete({ _id: userId });

        if (result === null) {
            res.status(404);
            res.json({
                status: 404,
                message: 'not found',
            });
            return;
        }
        else {
            // delete all posts belonging to user
            const delete_posts = await Posts.deleteMany({ user_id: userId });
        }
        res.send('user deleted');
        
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            status: 500,
            message: e,
        });
    }
});

export default usersRouter;