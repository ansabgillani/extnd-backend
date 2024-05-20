import mongoose from 'mongoose';
import { MERCHANTS_CATEGORY } from '@/config/constants';

const Schema = mongoose.Schema;

const merchantSchema = new Schema({
    name: String,
    mobileNo: String,
    email: String,
    password: String,
    image: String,
    category: {
        type: String,
        enum: MERCHANTS_CATEGORY
    }
}, { timestamps: true });


const Merchant = mongoose.models.Merchant || mongoose.model('Merchant', merchantSchema);

export default Merchant;