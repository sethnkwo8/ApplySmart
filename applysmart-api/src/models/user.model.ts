import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser> ({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
}, {
    timestamps: true
})

export const User = mongoose.model<IUser>("User", userSchema)