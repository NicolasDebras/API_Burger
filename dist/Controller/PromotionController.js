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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionController = void 0;
const express_1 = __importDefault(require("express"));
const PromotionService_1 = require("../service/PromotionService");
const middleware_1 = require("../middleware");
class PromotionController {
    createPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotionBody = req.body;
            if (!promotionBody.name || !promotionBody.percentage) {
                res.status(400).end();
                return;
            }
            try {
                const promotion = yield PromotionService_1.PromotionService.getInstance().createPromotion({
                    name: promotionBody.name,
                    percentage: promotionBody.percentage
                });
                res.json(promotion);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    getAllPromotions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotions = yield PromotionService_1.PromotionService.getInstance().getAll();
            res.json(promotions);
        });
    }
    getPromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promotion = yield PromotionService_1.PromotionService.getInstance().getById(req.params.promotion_id);
                if (promotion === null) {
                    res.status(404).end();
                    return;
                }
                res.json(promotion);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    deletePromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield PromotionService_1.PromotionService.getInstance().deleteById(req.params.promotion_id);
                if (success) {
                    res.status(204).end();
                }
                else {
                    res.status(404).end();
                }
            }
            catch (err) {
                res.status(400).end();
            }
        });
    }
    updatePromotion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promotion = yield PromotionService_1.PromotionService.getInstance()
                    .updateById(req.params.promotion_id, req.body);
                if (!promotion) {
                    res.status(404).end();
                    return;
                }
                res.json(promotion);
            }
            catch (err) {
                res.status(400).end();
            }
        });
    }
    buildRoutes() {
        const routeur = express_1.default.Router();
        routeur.use((0, middleware_1.checkUserConnected)());
        routeur.post('/', (0, middleware_1.checkUserRole)(["admin", "bigBoss"]), express_1.default.json(), this.createPromotion.bind(this));
        routeur.get('/', (0, middleware_1.checkUserRole)(["admin", "bigBoss", "customer"]), this.getAllPromotions.bind(this));
        routeur.get('/:promotion_id', (0, middleware_1.checkUserRole)(["admin", "bigBoss", "customer"]), this.getPromotion.bind(this));
        routeur.delete('/:promotion_id', (0, middleware_1.checkUserRole)(["admin", "bigBoss"]), this.deletePromotion.bind(this));
        routeur.put('/:promotion_id', (0, middleware_1.checkUserRole)(["admin", "bigBoss"]), express_1.default.json(), this.updatePromotion.bind(this));
        return routeur;
    }
}
exports.PromotionController = PromotionController;
//# sourceMappingURL=PromotionController.js.map