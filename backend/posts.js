import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Posts } from './util.js';

const postRouter = Router();

postRouter.get('/', async (req, res) => {
    const userId = req.params.user_id;
    const posts = await Posts.find({ user_id: userId });

    res.send(posts);
});

postRouter.get('/:post_id', async (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;

    try {
        const post = await Posts.findOne({_id: postId, user_id: userId});
        
        if (post === null) {
            res.status(404);
            res.json({
                status: 404,
                message: 'not found',
            });
            return;
        }
        res.json(post);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
});

postRouter.post("/", async (req, res) => {
    const requestBody = req.body;
    requestBody._id = uuidv4();

    const userId = req.params.user_id;
    requestBody.user_id = userId;

    // add date to post
    requestBody.date = Date.now();

    try {
        const result = await new Posts(requestBody).save();
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

postRouter.delete('/:post_id', async (req, res) => {
    const userId = req.params.user_id;
    const postId = req.params.post_id;

    try {
        const post = await Posts.findOneAndDelete({ _id: postId, user_id: userId });

        if (post === null) {
            res.status(404);
            res.json({
                status: 404,
                message: 'not found',
            });
            return;
        }
        res.send('post deleted');
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
});

export default postRouter;
