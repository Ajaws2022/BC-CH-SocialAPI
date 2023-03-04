// Required: /api/users- get all users, get single user by id w/thought and friend data, Post new user, Put update user by id, Delete user by ID
// Required: /api/users/:userId/friends/:friendId Post new friend to user list, Delete friend from user list
const { Thought, User } = require('../models');

module.exports = {
    getUsers(req, res){
        User.find().then((users) => res.json(users)).catch(
            (err) => res.status(500).json(err)
        )
    },
    getSingleUser(req, res){
        User.findOne({_id:req.params.userId}).then(
            (user) =>
             !user
              ? res.status(404).json({message: 'No user with that Id'})
              : res.json(user)
        ).catch(
            (err) => res.status(500).json(err)
        );
    },
    createUser(req, res){
        User.create(req.body).then(
            (user)=> res.json(user)
        ).catch(
            (err) => res.status(500).json(err)
        );
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId}).then(
            (user) =>
             !user
              ? res.status(404).json({message: 'No user with that ID'})
              : Thought.deleteMany({_id: { $in: user.thought}})
        ).catch(
            (err) => res.status(500).json(err)
        );
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true }
        ).then((user) =>
         !user
          ? res.status(404).json({message: 'No user with that ID'})
          : res.json(user) 
        )
    },
    addFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body}},
            { runValidators: true, new: true }
        ).then((user)=>
          !user
            ? res.status(404).json({message: 'No user with that ID'})
            : res.json(user) 
        )
    },
    deleteFriend(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friend: {friendId: req.params.friendId}}},
            { runValidators: true, new: true }
        ).then((user)=>
          !user
            ? res.status(404).json({message: 'No user with that ID'})
            : res.json(user) 
        )
    }
}