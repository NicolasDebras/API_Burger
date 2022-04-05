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
exports.PromotionService = void 0;
const model_1 = require("../model");
class PromotionService {
    constructor() { }
    static getInstance() {
        if (PromotionService.instance === undefined) {
            PromotionService.instance = new PromotionService();
        }
        return PromotionService.instance;
    }
    createPromotion(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new model_1.PromotionModel(props);
            const promotion = yield model.save();
            return promotion;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.PromotionModel.find().exec();
        });
    }
    getById(promotionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.PromotionModel.findById(promotionId).exec();
        });
    }
    deleteById(promotionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield model_1.PromotionModel.deleteOne({ _id: promotionId }).exec();
            return res.deletedCount === 1;
        });
    }
    updateById(promotionId, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotion = yield this.getById(promotionId);
            if (!promotion) {
                return null;
            }
            if (props.name !== undefined) {
                promotion.name = props.name;
            }
            if (props.percentage !== undefined) {
                promotion.percentage = props.percentage;
            }
            const res = yield promotion.save();
            return res;
        });
    }
}
exports.PromotionService = PromotionService;
//# sourceMappingURL=PromotionService.js.map