import mongoose from "mongoose";
import { UserProps } from "./user_model";
export interface RestaurantProsp {
    name: string;
    Cordlat: number;
    Cordlong: number;
    user: UserProps[];
    id: string;
}
export declare type RestaurantDocument = RestaurantProsp & Document;
export declare const RestaurantModel: mongoose.Model<any, {}, {}, {}>;
