import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true, // Supprime les espaces au début et à la fin
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Validation de l'email
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Ajoute createdAt et updatedAt automatiquement
    }
);

const User = mongoose.model('User', userSchema);

export default User;
