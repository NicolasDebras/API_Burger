import mongoose, { Schema } from "mongoose"
import { sessionProsp } from "./session_model";

const UserSchema = new Schema({
    login : {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password : {
        type: Schema.Types.String,
        Required: true,
    },
    session : [{
        type: Schema.Types.ObjectId, 
        ref:"Session"
    }],
}, {
    timestamps: true,
    versionKey: false,
    collection: "user"
}
);

export interface UserProsp {

    login:string;
    password:string;
    sessions: string[] | sessionProsp[];
    id : string;
    
}

export type UserDocument = UserProsp & Document;

export const UserModel = mongoose.model("user", UserSchema);