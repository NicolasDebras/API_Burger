import mongoose from "mongoose";
import { UserProsp } from "./user_model";
export interface RestaurantProsp {
    name: string;
    Cordlat: number;
    Cordlong: number;
    user: UserProsp[];
    id: string;
}
export declare type RestaurantDocument = RestaurantProsp & Document;
export declare const RestaurantModel: mongoose.Model<any, {}, {}, {}>;
