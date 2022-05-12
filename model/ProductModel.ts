import mongoose, { Schema, Document } from "mongoose"
import { PromotionProsp } from "./PromotionModel";
import { IngredientProps} from "./ingredientModel";

const ProductSchema = new Schema({
    name : {
        type: Schema.Types.String,
        unique: true,
        required: true
    },
    recette :[ {
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: "ingredient",
            unique: true
        },
        num: {
            type: Schema.Types.Number
        }
    }],
    price : {
        type: Schema.Types.Number,
        Required: true,
        min:0
    },
    promotion : {
        type: Schema.Types.ObjectId,
        ref:"promotion"
    },

    receipts : [{
        type: Schema.Types.ObjectId,
        ref:"ingredient"
    }],
    promote : {
        type: Schema.Types.Boolean
    }

}, {
    timestamps: true,
    versionKey: false,
    collection:"product"
}
);

export interface ProductProsp {
    name: string;
    price: number;
    _id?: string;
    recette: [];
    promotion? : PromotionProsp;
    receipts ? : IngredientProps[];
    promote : boolean;
}

export type ProductDocument = ProductProsp & Document;

export const ProductModel = mongoose.model("product", ProductSchema);