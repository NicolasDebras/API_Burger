import mongoose, {Schema, Document} from "mongoose";
import { StringLiteralType } from "typescript";
import {SessionProps} from "./session_model";

const userSchema = new Schema({
    login: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    role:{
        type: Schema.Types.String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Session"
        }
    ],
    coordStart: 
        {
            long :Number,
            lat :Number
        }
    
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});

export interface UserProps {
    _id: string;
    login: string;
    password: string;
    role : string;
    restaurant?: string;
    sessions: string[] | SessionProps[];
    coordStart: {long: number, lat:number}
}

export type UserDocument = UserProps & Document;
export const UserModel = mongoose.model("User", userSchema);