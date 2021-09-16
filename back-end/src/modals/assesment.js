const mongoose = require('mongoose');
const assesmentSchema = mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
       
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
                trim: true
            },
             marks: {
                type: String,
                required: true,
                trim: true
            },
            isQuestionTypeBoolen: {
                type: Boolean,
                default: false
            },

            choices: [{
                name: {
                    type: String,
                    required: true,
                    trim: true
                },
                isTrue: {
                    type: Boolean,
                    default: false,
                }

            }]
        }
    ],
    totalTime: {
        type: Number,
        default: 0
    },
   

},


    {
        timestamps:
            true

    })
module.exports = mongoose.model('Assesment', assesmentSchema);
