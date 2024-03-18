import { Schema } from "mongoose";
import { db } from "../connections/mongodb";

export interface Topic {
    title: string;
    words: string[];
}

const schema = new Schema(
    {
        title: String,
        words: [String]
    }
)

export default db.model<Topic>('topic', schema, 'topics')