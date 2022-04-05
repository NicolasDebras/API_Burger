import mongoose from "mongoose";
import { UserProsp } from "./user_model";
export interface sessionProsp {
    _id: string;
    user: string | UserProsp;
    platfrom: string;
    expiration?: Date;
}
export declare type sessionDocument = sessionProsp & Document;
export declare const sessionModel: mongoose.Model<any, {}, {}, {}>;
