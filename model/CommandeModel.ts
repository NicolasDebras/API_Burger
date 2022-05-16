import mongoose, { Schema, Document } from "mongoose";
import {ProductProsp} from "./ProductModel";
import {PromotionProsp} from "./PromotionModel";
import {MenuProsp} from "./MenuModel";
import {RestaurantProsp} from "./RestaurantModel";
import {UserProps} from "./user_model";


const CommandeSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        nbrCommande: {
            type: Schema.Types.String,
            required: true
        },
        product : [{
            type: Schema.Types.ObjectId,
            ref: "product"
        }], // "]" -> permert de faire un tableau
        menu : [{
            type: Schema.Types.ObjectId,
            ref: "menu"
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
        },
        state : {
            type: Schema.Types.String
        }


    }, {
        timestamps: true,
        versionKey: false,
        collection: "commande"
    }
);

export interface CommandeProsp {
    user?: UserProps;
    product?: ProductProsp[];
    menu?: MenuProsp[];
    price: number;
    promotion? : PromotionProsp;
    restaurant : RestaurantProsp;
    nbrCommande?: string;
    state: String;
}

export type CommandeDocument = CommandeProsp & Document;

export const CommandeModel = mongoose.model("commande", CommandeSchema);