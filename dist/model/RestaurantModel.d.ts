import mongoose from "mongoose";
import { IngredientProps } from "./ingredientModel";
import { UserProps } from "./user_model";
export interface RestaurantProsp {
    name: string;
    Cordlat: number;
    Cordlong: number;
    user: UserProps[];
    stock: IngredientProps[];
    id: string;
}
export declare type RestaurantDocument = RestaurantProsp & Document;
export declare const RestaurantModel: mongoose.Model<any, {}, {}, {}>;
