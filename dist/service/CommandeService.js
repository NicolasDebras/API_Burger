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
const model_1 = require("../model");
const Product_1 = require("../class/Product");
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
            let test = yield Product_1.Product.enoughIngredient(props);
            let max = 7000000;
            let min = 1;
            let nbr = (Math.random() * (max - min) + min) | 0;
            props.nbrCommande = "CB" + nbr;
            const model = new model_1.CommandeModel(props);
            const commande = yield model.save();
            return commande;
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