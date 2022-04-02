import mongoose, { Schema } from "mongoose"
import { PromotionProsp } from "./PromotionModel";

const ProductSchema = new Schema({
    name : {
        type: Schema.Types.String,
        required: true
    },
    price : {
        type: Schema.Types.Number,
        Required: true,
        min:0 
    },
    promotion : {
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
}
);

export interface ProductProsp {
    name : string;
    price: number;
    id: string;
    promotion? : PromotionProsp;
}

export type ProductDocument = ProductProsp & Document;

export const ProductModel = mongoose.model("product", ProductSchema);