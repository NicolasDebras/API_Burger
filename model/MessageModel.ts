import mongoose, { Schema, Document } from "mongoose"
import { UserProps } from "./user_model";

const MessageSchema = new Schema({
    sender : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message : [{
        type: Schema.Types.String,
        required: true
    }]
}, {
    timestamps: true,
    versionKey: false,
    collection:"messages"
}
);

export interface MessageProps {
    sender: UserProps;
    message: string;
    _id?: string;
}

export type MessageDocument = MessageProps & Document;

export const MessageModel = mongoose.model("messages", MessageSchema);