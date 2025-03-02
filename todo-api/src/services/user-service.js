import UserModel from "../models/user-model.js";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export class UserService {

    getUserById(userId) {
        return UserModel.findById(userId);
    }

    updateUserById(userId,userData){
        return UserModel.findByIdAndUpdate(userId, userData, { new: true });
    }

    deleteUserById(userId) {
        return UserModel.findByIdAndDelete(userId);
    }

    registerUser = async (userPayload) => {
        const { email, password } = userPayload;
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            throw Error("Email already in use!");
        }

        const user = new UserModel({ email, password });
        await user.save();

        const userJwt = jwt.sign({
            id: user._id,
            email: user.email,
        }, config.jwtKey);

        return { user, token: userJwt };
    };

    loginUser = async (userPayload) => {
        const { email, password } = userPayload;
        const user = await UserModel.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            throw Error("Invalid credentials!");
        }

        const userJwt = jwt.sign({
            id: user._id,
            email: user.email,
        }, config.jwtKey);

        return { user, token: userJwt };
    }
}
