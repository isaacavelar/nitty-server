import { Schema } from "mongoose";
import { db } from "../connections/mongodb";
import { User } from "./user.model";

interface Words {
    word: string;
    currentDifficulty: 'very easy' | 'easy' | 'medium' | 'hard' | 'very hard';
    qtdConsecutiveCorrectGuesses: number;
    qtdConsecutiveVeryEasy: number;
    status: number;
}

export interface Activitie {
    name: string;
    progress: number;
    user: User;
    words: Words[]
}

const schema = new Schema(
    {
        name: String,
        progress: Number,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        words: {
            word: String,
            currentDifficulty: String,
            qtdConsecutiveCorrectGuesses: Number,
            qtdConsecutiveVeryEasy: Number,
            status: Number
        }
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

export default db.model<Activitie>('activities', schema, 'activities')