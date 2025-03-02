import mongoose, { Document } from 'mongoose';
import { config } from '../config.js';
import { compare, hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashed = await hash(this.password, 10);
        this.password = hashed;
    }
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return compare(candidatePassword, this.password);
};

const UserModel = mongoose.model(config.db.userCollection, userSchema);

export default UserModel;
