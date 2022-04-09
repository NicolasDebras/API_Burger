import mongoose, {Schema, Document} from "mongoose";
import {UserProps} from "./user_model";

const sessionScema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    platform: {
        type: Schema.Types.String,
        required: true
    },
    expiration: {
        type: Schema.Types.Date
    }
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
});

export interface SessionProps {
    _id: string;
    user: string | UserProps;
    platform: string;
    expiration?: Date;
}

export type SessionDocument = SessionProps & Document;
export const SessionModel = mongoose.model("Session", sessionScema);