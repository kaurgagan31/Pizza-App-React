const mongoose = require('mongoose')

const {
    Schema,
    model
} = mongoose

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    // image: {
    //     type: String
    // },
    hobbies: {
        type: Array,
    },
    role: {
        type: Number, default: 0
    },
    // accepted: {
    //     type: Boolean,
    // },
    is_deleted :{ type: Number, default: 0 }
},
    {
        timestamps: true
    })

module.exports = mongoose.models.Users ? model('Users') : model('Users', schema);