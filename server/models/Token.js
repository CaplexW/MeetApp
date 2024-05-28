import { Schema, model } from "mongoose";

const schema = {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
}

const token = new Schema(schema, { timestamps: true });

export default model('Token', token);