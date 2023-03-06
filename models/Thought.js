const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            min: 1,
            max: 280,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user_id:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: {
            type: String, 
            ref: 'user'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;