import mongoose, { Schema, Document } from "mongoose"


const RoleSchema = new Schema({
    name : {
        type: Schema.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: "role"
}
);

export interface RoleProsp {

    _id : string;
    name : string;
    
}

export type RoleDocument = RoleProsp & Document;

export const RoleModel = mongoose.model("Role", RoleSchema);