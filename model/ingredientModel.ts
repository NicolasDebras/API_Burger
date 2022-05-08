import mongoose, { Schema } from "mongoose"
import { UserProps } from "./user_model";
import {RestaurantProsp} from "./RestaurantModel";

const IngredientSchema = new Schema({
    name : {
        type: Schema.Types.String,
        required: true,
    },
    restaurant : {
        type: Schema.Types.ObjectId,
        ref: "restaurant",
        unique: true,
        required: true,
    },
    price : {
        type: Schema.Types.Number,
    },
    quantity : {
        type: Schema.Types.Number,
        Required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
    collection : "Ingredient"
}
);

export interface IngredientProps {
    name : string;
    restaurant: RestaurantProsp;
    price : number;
    quantity : number;
    id? :string;
}

export type IngredientDocument = IngredientProps & Document;

export const IngredientModel = mongoose.model("Ingredient", IngredientSchema);