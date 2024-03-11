import { ObjectId, Schema } from "mongoose";
import { db } from "../connections/mongodb";
import crypto from "crypto";

export interface User {
    _id: ObjectId;
    email: string;
    password: string;
    name: string;
    ingleslevel: 'beginner' | 'basic' | 'intermediary' | 'advanced';
    dailyStudyTime: number;
    generateHash(password: string): string;
    validPassword(password: string): boolean;
}

const schema = new Schema(
    {
        email: {
            type: String,
            index: true,
            unique: true
        },
        password: String,
        name: String,
        ingleslevel: String,
        dailyStudyTime: Number
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        },
    },
)

schema.methods.generateHash = function(password: string) {
    return crypto.pbkdf2Sync(password, this.email,
        1000, 64, `sha512`).toString(`hex`);
}

schema.methods.validPassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.email,
        1000, 64, `sha512`).toString(`hex`);

    return this.password === hash;
}

schema.pre<User>('save', function(next) {
    const user = this as User;
    if (user.password) {
        user.password = user.generateHash(user.password);
    }
    next();
});

export default db.model<User>('user', schema, 'users');