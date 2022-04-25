import mongoose, { Schema } from "mongoose"
import { UserProps } from "./user_model";

const IngredientSchema = new Schema({
    name : {
        type: Schema.Types.String,
        required: true
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
    price : number;
    quantity : number;
    id :string;
}

export type IngredientDocument = IngredientProps & Document;

export const IngredientModel = mongoose.model("restaurant", IngredientSchema);