import { Schema, model } from "mongoose";

const schema = {
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    image: String,
    completedMeetings: Number,
    sex: { type: String, enum: ['male', 'female', 'other'] },
    rate: Number,
    profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
    bookmark: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}

const user = new Schema(schema, { timestamps: true });

export default model('User', user);