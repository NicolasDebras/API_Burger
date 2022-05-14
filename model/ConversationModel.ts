import mongoose, { Schema, Document } from "mongoose"
import { MessageProps } from "./MessageModel";
import { UserProps } from "./user_model";


const ConversationSchema = new Schema({
    member_a : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    member_b : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages : [{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"messages"
    }]


}, {
    timestamps: true,
    versionKey: false,
    collection: "conversation"
}
);

export interface ConversationProps {
    member_a: UserProps;
    member_b: UserProps;
    messages: MessageProps[];
    _id?: string;
}

export type ConversationDocument = ConversationProps & Document;

export const ConversationModel = mongoose.model("conversation", ConversationSchema);