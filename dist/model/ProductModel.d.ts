import mongoose, { Document } from "mongoose";
import { PromotionProsp } from "./PromotionModel";
export interface ProductProsp {
    name: string;
    price: number;
    _id?: string;
    promotion?: PromotionProsp;
}
export declare type ProductDocument = ProductProsp & Document;
export declare const ProductModel: mongoose.Model<any, {}, {}, {}>;
