import { Schema } from "mongoose";
import { db } from "../connections/mongodb";

export interface Topic {
    title: string;
    words: {
        word: string;
        translation: string;
    }[];
}

const schema = new Schema(
    {
        title: String,
        words: [{
            word: String,
            translation: String

        }]
    }
)

export default db.model<Topic>('topic', schema, 'topics')