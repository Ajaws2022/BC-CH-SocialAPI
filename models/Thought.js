const { Schema, Types } = require('mongoose');
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            _id: { type: [Schema.Types.ObjectId], ref: 'user'},
            username: {type: String, ref:'user'}
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);
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
            _id: { type: [Schema.Types.ObjectId], ref: 'user'},
            username: {type: String, ref:'user'}
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: reactionSchema
            }
        ]
    }
);

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;