"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const model_1 = require("../model");
class ProductService {
    constructor() { }
    static getInstance() {
        if (ProductService.instance === undefined) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }
    createProduct(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new model_1.ProductModel(props);
            const product = yield model.save();
            return product;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.ProductModel.find().exec();
        });
    }
    getById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.ProductModel.findById(String(productId)).exec();
        });
    }
    deleteById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield model_1.ProductModel.deleteOne({ _id: productId }).exec();
            return res.deletedCount === 1;
        });
    }
    updateById(productId, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getById(productId);
            if (!product) {
                return null;
            }
            if (props.name !== undefined) {
                product.name = props.name;
            }
            if (props.price !== undefined) {
                product.price = props.price;
            }
            if (props.promotion !== undefined) {
                product.promotion = props.promotion;
            }
            const res = yield product.save();
            return res;
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map