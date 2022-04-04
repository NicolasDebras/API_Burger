import mongoose from "mongoose";
import { ProductProsp } from "./ProductModel";
import { PromotionProsp } from "./PromotionModel";
export interface MenuProsp {
    name: string;
    product: ProductProsp[];
    price: number;
    id: string;
    promotion?: PromotionProsp;
}
export declare type MenuDocument = MenuProsp & Document;
export declare const MenuModel: mongoose.Model<any, {}, {}, {}>;
