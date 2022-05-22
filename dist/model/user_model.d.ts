import mongoose, { Document } from "mongoose";
import { SessionProps } from "./session_model";
export interface UserProps {
    _id: string;
    login: string;
    password: string;
    role: string;
    restaurant?: string;
    sessions: string[] | SessionProps[];
    coordStart: {
        long: number;
        lat: number;
    };
}
export declare type UserDocument = UserProps & Document;
export declare const UserModel: mongoose.Model<any, {}, {}, {}>;
