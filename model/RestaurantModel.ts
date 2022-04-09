import mongoose, { Schema } from "mongoose"
import { UserProps } from "./user_model";

const RestaurantSchema = new Schema({
    name : {
        type: Schema.Types.String,
        required: true
    },
    Cordlat : {
        type: Schema.Types.Number,
        Required: true,
    },
    Cordlong : {
        type: Schema.Types.Number,
        Required: true,
    },
    user : [{
        type : Schema.Types.ObjectId
    }] 

}, {
    timestamps: true,
    versionKey: false,
    collection : "restaurant"
}
);

export interface RestaurantProsp {
    name : string;
    Cordlat : number;
    Cordlong : number;
    user : UserProps[];
    id :string;
}

export type RestaurantDocument = RestaurantProsp & Document;

export const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);