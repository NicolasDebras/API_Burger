import mongoose, { Document } from "mongoose";
import { ProductProsp } from "./ProductModel";
import { PromotionProsp } from "./PromotionModel";
import { MenuProsp } from "./MenuModel";
export interface CommandeProsp {
    product?: ProductProsp[];
    menu?: MenuProsp[];
    price?: number;
    _id?: string;
    promotion?: PromotionProsp;
    nbrCommande?: string;
}
export declare type CommandeDocument = CommandeProsp & Document;
export declare const CommandeModel: mongoose.Model<any, {}, {}, {}>;
