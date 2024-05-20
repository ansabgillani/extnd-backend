import mongoose from 'mongoose'
import { question1Options, question3Options, question4Options, question5Options, question6Options, question7Options, question8Options, question9Options, question10Options, } from '@/config/questionsOptions'
const Schema = mongoose.Schema;
import { DOCUMENT_REJECTION_REASONS } from '@/config/constants';

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    maritalStatus: String,
    // documents: {
    //     CNIC: {
    //         frontSide: String,
    //         backSide: String,
    //         expiry: String,
    //         CNICNumber: String,
    //         isApproved: Boolean
    //     },
    //     passport: {
    //         passportNo: String,
    //         passportPicture: String,
    //         isApproved: Boolean
    //     },
    //     selfie: { // The selfie should come with CNIC being held in the hand
    //         picture: String,
    //         isApproved: Boolean
    //     }
    // },
    CNIC: String,
    DOB: Date,
    mobileNo: String,
    email: String,
    password: String,
    isActive: {
        type: Boolean,
        default: false,
    },
    KYC: {
        answer1: {
            type: String,
            enum: question1Options.map(q => q.id)
        },
        answer2: {
            houseNo: String,
            street: String,
            area: String,
        },
        answer3: {
            type: String,
            enum: question3Options.map(q => q.id)
        },
        answer4: {
            type: String,
            enum: question4Options.map(q => q.id)
        },
        answer5: {
            type: String,
            enum: question5Options.map(q => q.id)
        },
        answer6: {
            type: String,
            enum: question6Options.map(q => q.id)
        },
        answer7: {
            type: String,
            enum: question7Options.map(q => q.id)
        },
        answer8: {
            answer: {
                type: String,
                enum: question8Options.map(q => q.id)
            },
            merchantName: String,
            referralCode: String,
        },
        answer9: {
            type: String,
            enum: question9Options.map(q => q.id)
        },
        answer10: {
            type: String,
            enum: question10Options.map(q => q.id)
        },
        totalPoints: Number
    },
    documents: [{
        docType: {
            type: String,
            enum: ['CNIC', 'Passport', 'Selfie']
        },
        image: String,
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Invalid', 'Cancelled'],
            default: 'Pending'
        },
        rejectionReason: {
            type: String,
            enum: DOCUMENT_REJECTION_REASONS
        }
    }],
    eligibility: {
        proposedCreditLimit: Number,
        allowedCredits: Number,
        installmentDuration: {
            limit: Number,
            limitUnit: Number
        },
        isKYCApproved: {
            type: Boolean,
            default: false
        },
        isEligible: {
            type: Boolean,
            default: false
        },
        areDocumentsApproved: Boolean,
    },
    supportAssistant: {
        type: Schema.Types.Mixed,
        ref: 'Support',
    },
}, { timestamps: true });


const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema)
export default Customer;
