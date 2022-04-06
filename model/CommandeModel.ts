import mongoose, { Schema, Document } from "mongoose";
import {ProductProsp} from "./ProductModel";
import {PromotionProsp} from "./PromotionModel";
import {MenuProsp} from "./MenuModel";


const CommandeSchema = new Schema({
        name : {
            type: Schema.Types.String,
            required: true
        },
        product : [{
            type: Schema.Types.ObjectId,
            required:true
        }], // "]" -> permert de faire un tableau
        menu : [{
            type: Schema.Types.ObjectId,
            required:true
        }],
        price : {
            type: Schema.Types.Number,
            Required: true,
            min:0
        },
        promotion : {
            type: Schema.Types.ObjectId,
            ref:"promotion"
        }

    }, {
        timestamps: true,
        versionKey: false,
        collection: "commande"
    }
);

export interface CommandeProsp {
    name: string;
    product?: ProductProsp[];
    menu?: MenuProsp[];
    price?: number;
    _id?: string;
    promotion? : PromotionProsp;
}

export type CommandeDocument = CommandeProsp & Document;

export const CommandeModel = mongoose.model("commande", CommandeSchema);