import mongoose, {Schema, Document} from "mongoose";

export const Providers = [
    "local", "google"
] as const;

export type ProviderName = typeof Providers[number];
export interface IUser extends Document {
    name: string;
    email: string;
    provider: ProviderName;
    googleId?: string;
    password?: string;
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
    provider: {
        type: String,
        enum: Providers,
        required: true
    },
    googleId: {
        type: String,
        required: false,
        unique:true,
        sparse: true // tells MongoDB to ignore missing or null values when enforcing uniqueness
    },
    password: {
        required: false,
        type: String
    }
}, {
    timestamps: true
})

export const User = mongoose.model<IUser>("User", userSchema)