import { Schema, model } from "mongoose";

const schema = {
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}

const quality = new Schema(schema, { timestamps: true });

export default model('Quality', quality);