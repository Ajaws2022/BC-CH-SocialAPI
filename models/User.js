const { Schema, Types } = require('mongoose');
const validateEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email)
};
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please use a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                _id: { type: [Schema.Types.ObjectId], ref: 'user'},
                username: {type: String, ref:'user'}
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userSchema.virtual('friendsCount').get(() => {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;