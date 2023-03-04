const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData');
const thoughtData = require('./thoughtData');

connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});
    const newUserData = [...userData];
    const newThoughtData = [...thoughtData];
    await User.collection.insertMany(newUserData);
    await Thought.collection.insertMany(newThoughtData);

    console.table(newUserData);
    console.table(newThoughtData);
    process.exit(0);
})