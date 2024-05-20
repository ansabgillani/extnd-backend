const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supportSchema = new Schema({
    name: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    DOB: Date,
    mobileNo: String,
    email: String,
    password: String,
    image: String
}, { timestamps: true });


const Support = mongoose.models.Support || mongoose.model('Support', supportSchema);

export default Support;