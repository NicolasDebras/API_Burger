import mongoose, { Document } from "mongoose";
import { PromotionProsp } from "./PromotionModel";
import { IngredientProps } from "./ingredientModel";
export interface ProductProsp {
    name: string;
    price: number;
    _id?: string;
    recette: [];
    promotion?: PromotionProsp;
    receipts?: IngredientProps[];
}
export declare type ProductDocument = ProductProsp & Document;
export declare const ProductModel: mongoose.Model<any, {}, {}, {}>;
