import mongoose, { Schema } from "mongoose"
import { UserProps } from "./user_model";
import {RestaurantProsp} from "./RestaurantModel";

const IngredientSchema = new Schema({
    name : {
        type: Schema.Types.String,
    },
    restaurant : {
        type: Schema.Types.ObjectId,
        ref: "restaurant",
    },
    price : {
        type: Schema.Types.Number,
    },
    quantity : {
        type: Schema.Types.Number,
    },
    ingredient : {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
        required: false
    },
    stock : {
        type: Schema.Types.Boolean,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    collection : "Ingredient"
}
);

export interface IngredientProps {
    name? : string;
    restaurant?: RestaurantProsp;
    price?: number;
    quantity? : number;
    id? :string;
    ingredient? : IngredientProps;
    stock: boolean;
}

export type IngredientDocument = IngredientProps & Document;

export const IngredientModel = mongoose.model("Ingredient", IngredientSchema);