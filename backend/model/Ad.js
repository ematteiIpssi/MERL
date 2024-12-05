import { Schema, model } from 'mongoose';

const adSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default model('Ad', adSchema);
