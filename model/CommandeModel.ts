import mongoose, { Schema, Document } from "mongoose";
import {ProductProsp} from "./ProductModel";
import {PromotionProsp} from "./PromotionModel";
import {MenuProsp} from "./MenuModel";
import {RestaurantProsp} from "./RestaurantModel";


const CommandeSchema = new Schema({
        nbrCommande: {
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
        },
        restaurant : {
            type: Schema.Types.ObjectId,
            ref:"restaurant"
        }

    }, {
        timestamps: true,
        versionKey: false,
        collection: "commande"
    }
);

export interface CommandeProsp {
    product?: ProductProsp[];
    menu?: MenuProsp[];
    price?: number;
    _id?: string;
    promotion? : PromotionProsp;
    restaurant? : RestaurantProsp;
    nbrCommande?: string;
}

export type CommandeDocument = CommandeProsp & Document;

export const CommandeModel = mongoose.model("commande", CommandeSchema);