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
exports.ProductController = void 0;
const express_1 = __importDefault(require("express"));
const ProductService_1 = require("../service/ProductService");
class ProductController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productBody = req.body;
            if (!productBody.name || !productBody.price) {
                res.status(400).end();
                return;
            }
            try {
                const product = yield ProductService_1.ProductService.getInstance().createProduct({
                    name: productBody.name,
                    price: productBody.price,
                    promotion: productBody.promotion
                });
                res.json(product);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductService_1.ProductService.getInstance().getAll();
            res.json(products);
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductService_1.ProductService.getInstance().getById(req.params.product_id);
                if (product === null) {
                    res.status(404).end();
                    return;
                }
                res.json(product);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield ProductService_1.ProductService.getInstance().deleteById(req.params.product_id);
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
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield ProductService_1.ProductService.getInstance()
                    .updateById(req.params.product_id, req.body);
                if (!product) {
                    res.status(404).end();
                    return;
                }
                res.json(product);
            }
            catch (err) {
                res.status(400).end();
            }
        });
    }
    buildRoutes() {
        const routeur = express_1.default.Router();
        routeur.post('/', express_1.default.json(), this.createProduct.bind(this));
        routeur.get('/', this.getAllProducts.bind(this));
        routeur.get('/:product_id', this.getProduct.bind(this));
        routeur.delete('/:product_id', this.deleteProduct.bind(this));
        routeur.put('/:product_id', express_1.default.json(), this.updateProduct.bind(this));
        return routeur;
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map