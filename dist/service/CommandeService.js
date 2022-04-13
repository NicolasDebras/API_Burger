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
exports.CommandeService = void 0;
const ProductService_1 = require("./ProductService");
const model_1 = require("../model");
class CommandeService {
    constructor() {
    }
    static getInstance() {
        if (CommandeService.instance === undefined) {
            CommandeService.instance = new CommandeService();
        }
        return CommandeService.instance;
    }
    createCommande(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let max = 7000000;
            let min = 1;
            let nbr = (Math.random() * (max - min) + min) | 0;
            props.nbrCommande = "CB" + nbr;
            props.price = yield this.priceCommande(props);
            const model = new model_1.CommandeModel(props);
            const commande = yield model.save();
            return commande;
        });
    }
    priceCommande(props) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            let products = props.product;
            let menus = props.menu;
            let price;
            price = 0;
            if (products !== undefined) {
                for (i = 0; i < (products === null || products === void 0 ? void 0 : products.length); i++) {
                    let product = String(products[i]);
                    const product1 = yield ProductService_1.ProductService.getInstance().getById(product);
                    if (product1) {
                        if (((_a = product1.promotion) === null || _a === void 0 ? void 0 : _a.percentage) !== undefined) {
                            price = price + product1.price * 100 / (product1 === null || product1 === void 0 ? void 0 : product1.promotion.percentage);
                        }
                        else {
                            price = price + product1.price * 100;
                        }
                    }
                    console.log(price);
                }
            }
            if (menus !== undefined) {
                for (i = 0; i < (menus === null || menus === void 0 ? void 0 : menus.length); i++) {
                    let menu = String(menus[i]);
                    const menu1 = yield ProductService_1.ProductService.getInstance().getById(menu);
                    if (menu1) {
                        if (((_b = menu1.promotion) === null || _b === void 0 ? void 0 : _b.percentage) !== undefined) {
                            price = price + menu1.price * 100 / (menu1 === null || menu1 === void 0 ? void 0 : menu1.promotion.percentage);
                        }
                        else {
                            price = price + menu1.price * 100;
                        }
                    }
                    console.log(price);
                }
            }
            return price;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.CommandeModel.find().exec();
        });
    }
    getById(idCommande) {
        return __awaiter(this, void 0, void 0, function* () {
            return model_1.CommandeModel.findById(idCommande).exec();
        });
    }
    deleteById(commandeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield model_1.CommandeModel.deleteOne({ _id: commandeId }).exec();
            return res.deletedCount === 1;
        });
    }
    updateById(commandeId, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const commande = yield this.getById(commandeId);
            if (!commande) {
                return null;
            }
            if (props.nbrCommande !== undefined) {
                commande.nbrCommande = props.nbrCommande;
            }
            if (props.menu !== undefined) {
                commande.menu = props.menu;
            }
            if (props.product !== undefined) {
                commande.product = props.product;
            }
            if (props.promotion !== undefined) {
                commande.promotion = props.promotion;
            }
            if (props.price !== undefined) {
                commande.price = props.price;
            }
            if (props.price !== undefined) {
                commande.price = props.price;
            }
            const res = yield commande.save();
            return res;
        });
    }
}
exports.CommandeService = CommandeService;
//# sourceMappingURL=CommandeService.js.map