import { Schema, model } from "mongoose";

const schema = {
    content: { type: String, required: true },
    pageId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}

const comment = new Schema(schema, { timestamps: { createdAt: 'created_at'} });

export default model('Comment', comment);