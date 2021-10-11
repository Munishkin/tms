import mongoose from 'mongoose';

const recordsSchema = mongoose.Schema({
    projectDescription: {
        type: String,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'UserModel'
    }
},
{
    timestamps: true
});

export default mongoose.model('RecordsModel', recordsSchema);

