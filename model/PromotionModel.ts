import mongoose, { Schema } from "mongoose"

const PromotionSchema = new Schema({
    name : {
        type: Schema.Types.String,
        required: true
    },
    percentage : {
        type: Schema.Types.Number,
        Required: true,
        min:1 
    }
}, {
    timestamps: true,
    versionKey: false
}
);

export interface PromotionProsp {
    name : string;
    percentage: number;
    id :string;
}

export type ProductDocument = PromotionProsp & Document;

export const ProductModel = mongoose.model("product", PromotionSchema);