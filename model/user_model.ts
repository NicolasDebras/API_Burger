import mongoose, { Schema } from "mongoose"
import { RoleProsp } from "./roleModel";
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
        ref:"session"
    }],
    role : {
        type: Schema.Types.ObjectId,
        ref:"role"
    }
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
    role : RoleProsp;
    
}

export type UserDocument = UserProsp & Document;

export const UserModel = mongoose.model("user", UserSchema);