const mongoose = require('mongoose');
const assesmentSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assesments: [
        {
            assessmentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Assessment',
            },
            attempt: {
                type: Number,
                default: 0
            },

            score: {
                type: Number,
                default: 0
            },
            wrong: {
                type: Number,
                default: 0
            },
        }
    ],
},
    { timestamps: true }
)
module.exports = mongoose.model('UserAssesment', assesmentSchema);
