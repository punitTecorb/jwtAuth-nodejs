import { Schema, model } from 'mongoose';

interface User {
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    dob: string;
    image: string,
    role: string;
    token:string
    isActive: boolean;
    isDelete: boolean;

}

const schema = new Schema<User>({
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    countryCode: { type: String, required: true, default: '+91' },
    dob: { type: String },
    token: { type: String },
    role: { type: String, required: true },
    image: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },

}, {
    timestamps: true,
    versionKey: false
});

const userModel = model<User>('Users', schema);
export = userModel