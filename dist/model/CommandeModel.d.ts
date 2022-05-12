import mongoose, { Document } from "mongoose";
import { ProductProsp } from "./ProductModel";
import { PromotionProsp } from "./PromotionModel";
import { MenuProsp } from "./MenuModel";
import { RestaurantProsp } from "./RestaurantModel";
export interface CommandeProsp {
    product?: ProductProsp[];
    menu?: MenuProsp[];
    price?: number;
    _id?: string;
    promotion?: PromotionProsp;
    restaurant?: RestaurantProsp;
    nbrCommande?: string;
}
export declare type CommandeDocument = CommandeProsp & Document;
export declare const CommandeModel: mongoose.Model<any, {}, {}, {}>;
