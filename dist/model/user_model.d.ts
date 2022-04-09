import mongoose, { Document } from "mongoose";
import { SessionProps } from "./session_model";
export interface UserProps {
    _id: string;
    login: string;
    password: string;
    role: string;
    sessions: string[] | SessionProps[];
}
export declare type UserDocument = UserProps & Document;
export declare const UserModel: mongoose.Model<any, {}, {}, {}>;
