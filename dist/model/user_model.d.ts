import mongoose from "mongoose";
import { RoleProsp } from "./roleModel";
import { sessionProsp } from "./session_model";
export interface UserProsp {
    login: string;
    password: string;
    sessions: string[] | sessionProsp[];
    id: string;
    role: RoleProsp;
}
export declare type UserDocument = UserProsp & Document;
export declare const UserModel: mongoose.Model<any, {}, {}, {}>;
