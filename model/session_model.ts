import mongoose, { Schema } from "mongoose"
import { UserProsp } from "./user_model";


const SessionSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    platfrom : {
        type: Schema.Types.String,
        Required: true
    },
    expiration : {
        type: Schema.Types.Date
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: "session"
}
);

export interface sessionProsp {

    _id : string;
    user: string | UserProsp;
    platfrom : string;
    expiration?: Date;
    
}

export type sessionDocument = sessionProsp & Document;

export const sessionModel = mongoose.model("session", SessionSchema);