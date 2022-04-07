import mongoose from "mongoose";
export interface RoleProsp {
    _id: string;
    name: string;
}
export declare type RoleDocument = RoleProsp & Document;
export declare const RoleModel: mongoose.Model<any, {}, {}, {}>;
