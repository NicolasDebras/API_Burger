import mongoose, { Schema, Document } from "mongoose"
import { ProductProsp } from "./ProductModel";
import { PromotionProsp } from "./PromotionModel";

const MenuSchema = new Schema({
    name : {
        type: Schema.Types.String,
        required: true
    },
    product : [{
        type: Schema.Types.ObjectId,
        required:true
    }], // "]" -> permert de faire un tableau 
    price : {
        type: Schema.Types.Number,
        Required: true,
        min:0 
    },
    promotion : {
        type: Schema.Types.ObjectId,
        ref:"promotion"
    },
    promote : {
        type: Schema.Types.Boolean
    }

}, {
    timestamps: true,
    versionKey: false,
    collection: "menu"
}
);

export interface MenuProsp {
    name: string;
    product: ProductProsp[];
    price: number;
    _id?: string;
    promotion? : PromotionProsp;
    promote : boolean;
}

export type MenuDocument = MenuProsp & Document;

export const MenuModel = mongoose.model("menu", MenuSchema);