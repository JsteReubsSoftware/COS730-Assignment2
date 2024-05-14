const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a username"]
        },
        email: {
            type: String,
            required: true
        },
        profileImg: {
            type: String,
            required: false
        },
        language: {
            type: String,
            required: true,
            default: 'en'
        },
        censorText: {
            type: Boolean,
            required: true,
            default: false
        },
        contacts: {
            type: Array,
            default: []
        },
        chatRooms: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

const Users = mongoose.model('Users', usersSchema);
module.exports = Users