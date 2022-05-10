import mongoose, { Schema, Document } from "mongoose"
import {ProductProsp, RestaurantProsp} from "../dist/model";
import {PromotionProsp} from "./PromotionModel";
import {MenuProsp} from "./MenuModel";


const PromoteSchema = new Schema({
    restaurant : {
        type: Schema.Types.ObjectId,
        ref: "restaurant"
    },
    product : [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }],
    menu : [{
        type: Schema.Types.ObjectId,
        ref: "menu"
    }],
    promotion : [{
        type: Schema.Types.ObjectId,
        ref:"promotion"
    }]
    }, {
        timestamps: true,
        versionKey: false,
        collection:"ppromote"
    }
);

export interface PromoteProsp {
    restaurant: RestaurantProsp[],
    product: ProductProsp[],
    menu: MenuProsp[],
    promotion: PromotionProsp[],
}

export type PromoteDocument = PromoteProsp & Document;

export const PromoteModel = mongoose.model("product", PromoteSchema);