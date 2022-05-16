import mongoose, { Document } from "mongoose";
import { ProductProsp } from "./ProductModel";
import { PromotionProsp } from "./PromotionModel";
import { MenuProsp } from "./MenuModel";
import { RestaurantProsp } from "./RestaurantModel";
import { UserProps } from "./user_model";
export interface CommandeProsp {
    user?: UserProps;
    product?: ProductProsp[];
    menu?: MenuProsp[];
    price: number;
    promotion?: PromotionProsp;
    restaurant: RestaurantProsp;
    nbrCommande?: string;
    state: String;
}
export declare type CommandeDocument = CommandeProsp & Document;
export declare const CommandeModel: mongoose.Model<any, {}, {}, {}>;
