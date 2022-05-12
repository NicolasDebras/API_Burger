"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        required: true
    },
    recette: [{
            ingredient: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "ingredient",
                unique: true
            },
            num: {
                type: mongoose_1.Schema.Types.Number
            }
        }],
    price: {
        type: mongoose_1.Schema.Types.Number,
        Required: true,
        min: 0
    },
    promotion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "promotion"
    },
    receipts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "ingredient"
        }],
    promote: {
        type: mongoose_1.Schema.Types.Boolean
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: "product"
});
exports.ProductModel = mongoose_1.default.model("product", ProductSchema);
//# sourceMappingURL=ProductModel.js.map