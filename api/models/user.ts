import mongoose, { Document, Schema } from "mongoose";
import { ITransaction } from "./transaction";

// Interface representing a User
interface IUser extends Document {
    firstName: string,
    lastName: string,
    balance: number;
    transactions: ITransaction[];
    createdAt: Date;
}

// User Model's Schema for MongoDB
const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction', // Reference to the Transaction model
            default: []
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre Transforming Output for API
userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.__v;
    }
});

// Declaring Complete MongoDB Model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
