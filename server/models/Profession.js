import { Schema, model } from "mongoose";

const schema = {
    name: {
        type: String,
        required: true
    }
}

const profession = new Schema(schema, { timestamps: true });

export default model('Profession', profession);