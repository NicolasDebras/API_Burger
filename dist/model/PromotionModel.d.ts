import mongoose, { Document } from "mongoose";
export interface PromotionProsp {
    name: string;
    percentage: number;
    _id?: string;
}
export declare type PromotionDocument = PromotionProsp & Document;
export declare const PromotionModel: mongoose.Model<any, {}, {}, {}>;
