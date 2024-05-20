const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderid = require('order-id')(process.env.ORDER_ID_SECRET_KEY);

import { TRANSACTION_REJECTION_REASONS } from '@/config/constants';

const orderSchema = new Schema({
    title: String,
    orderId: {
        type: String, // Generate from a library
        default: orderid.generate()
    },
    items: [{
        name: String,
        quantity: Number,
        unitPrice: Number,
        description: String,
        imageURL: String, // Image URL will come from the merchant
    }],
    transactions: [{
        paymentMethod: {
            type: String,
            enum: ['cash', 'debitCard', 'creditCard', 'IBFT', 'jazzCash', 'easyPaisa'],
            default: 'IBFT'
        },
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Unpaid', 'Rejected', 'Invalid'],
            default: 'Pending'
        },
        currency: {
            type: String,
            enum: ['PKR'],
            default: 'PKR'
        }, // By default PKR
        paidOn: Date,
        bankName: String,
        IBAN: String,
        amountPaid: Number,
        paymentSlip: String,
        transactionId: String,
        rejectionReason: {
            type: String,
            enum: TRANSACTION_REJECTION_REASONS
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved'],
        default: 'Pending'
    },
    installments: [{
        title: String,
        dueDate: Date,
        amount: Number,
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Unpaid'],
            default: 'Pending'
        },
        currency: {
            type: String,
            enum: ['PKR'],
            default: 'PKR'
        }, // By default PKR
    }],
    totalOrderAmount: Number,
    specialInstructions: String,
    merchant: {
        type: Schema.Types.Mixed,
        ref: 'Merchant'
    },
    customer: {
        type: Schema.Types.Mixed,
        ref: 'Customer'
    },
    supportAssistant: {
        type: Schema.Types.Mixed,
        ref: 'Support'
    },
    overDueAmount: {
        type: Number,
        default: 0
    },
    limits: {
        upperLimit: {
            type: Number,
            immutable: true,
        },
        lowerLimit: {
            type: Number,
            immutable: true,
        }
    }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;