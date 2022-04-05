import mongoose, { Schema , Document} from "mongoose"

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
    versionKey: false,
    collection : "promotion"
}
);

export interface PromotionProsp {
    name : string;
    percentage: number;
    _id? :string;
}

export type PromotionDocument = PromotionProsp & Document;

export const PromotionModel = mongoose.model("promotion", PromotionSchema);