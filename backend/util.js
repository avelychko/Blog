import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const Users = mongoose.model('users', {
    _id: mongoose.SchemaTypes.String,
    name: mongoose.SchemaTypes.String,
    username: mongoose.SchemaTypes.String,
    password: mongoose.SchemaTypes.String
});

export const Posts = mongoose.model('posts', {
    _id: mongoose.SchemaTypes.String,
    description: mongoose.SchemaTypes.String,
    date: mongoose.SchemaTypes.Date,
    user_id: mongoose.SchemaTypes.String
});