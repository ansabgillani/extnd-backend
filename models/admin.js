const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    DOB: Date,
    mobileNo: String,
    email: String,
    password: String
}, { timestamps: true });


const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;