import { Schema } from "mongoose";
import { db } from "../connections/mongodb";
import { User } from "./user.model";
import { Words } from "../interfaces/words.interface";

export interface Task {
    name: string;
    progress: number;
    status:    number;
    startDate: string;
    completionDate: string;
    user: User;
    words: Words[]
}

const schema = new Schema(
    {
        name: String,
        progress: Number,
        status: Number,
        startDate: String,
        completionDate: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        words: [{
            word: String,
            currentDifficulty: String,
            qtdConsecutiveCorrectGuesses: Number,
            qtdConsecutiveVeryEasy: Number,
            status: Number,
            translation: String
        }]
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

export default db.model<Task>('task', schema, 'tasks')