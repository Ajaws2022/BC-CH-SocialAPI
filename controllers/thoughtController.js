// Required /api/thoughts- Get all thoughts, Get thought by _id, Post new thought and add _id to user, Put update thought by _id, Delete thought by _id, Delete thought by _id
// Required /api/thoughts/:thoughtId/reactions- Post reaction to thought, Delete reaction from thought by id
const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res){
        Thought.find().populate('reactions').then((thoughts) => res.json(thoughts)).catch((err) => {
                console.error(err)
                res.status(500).json(err)
            }
        )
    },
    getSingleThought(req, res){
        Thought.findOne({_id:req.params.thoughtId}).then(
            (thought) =>
             !thought
              ? res.status(404).json({message: 'No thought with that Id'})
              : res.json(thought)
        ).catch(
            (err) => res.status(500).json(err)
        );
    },
    createThought(req, res){
        Thought.create(req.body).then((thought)=>
            !thought
             ? res.status(404).json({message: "no thought with that id"}) 
             : User.findOneAndUpdate(
                {username: req.body.username},
                {$push: {thoughts: thought.id}},
                { new: true }
             ).then(res.json({message: "Thought Created"}))
             
         ).catch(
            (err) => console.error(err)
        );
    },
    deleteThought(req, res){
        Thought.findOneAndDelete({_id: req.params.thoughtId}).then(
            (user) =>
             !user
              ? res.status(404).json({message: 'No user with that ID'})
              : res.json({message: 'Thought deleted.'})
        ).catch(
            (err) => res.status(500).json(err)
        );
    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            { runValidators: true, new: true }
        ).then((thought) =>
         !thought
          ? res.status(404).json({message: 'No thought with that ID'})
          : res.json(thought) 
        )
    },
    addReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            { runValidators: true, new: true }
        ).then((thought)=>
          !thought
            ? res.status(404).json({message: 'No thought with that ID'})
            : res.json(thought) 
        )
    },
    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true },
            console.log(req.params.reactionId)
        ).then((thought)=>
          !thought
            ? res.status(404).json({message: 'No thought with that ID'})
            : res.json(thought) 
        )
    }
}