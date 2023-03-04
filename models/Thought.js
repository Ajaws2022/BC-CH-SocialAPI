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
        username: {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;