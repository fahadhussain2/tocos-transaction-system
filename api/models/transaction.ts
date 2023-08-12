import mongoose, { Document, Schema, SchemaTypes, Types } from "mongoose";

// Interface representing a Transaction
export interface ITransaction extends Document {
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    amount: number;
    details: string;
    createdAt: Date;
}

// Transaction Model's Schema for MongoDB
const transactionSchema = new Schema<ITransaction>({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    details: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre Transforming Output for API
transactionSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    }
});

// Declaring Complete MongoDB Model
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
