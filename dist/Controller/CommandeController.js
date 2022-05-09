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
exports.CommandeController = void 0;
const express_1 = __importDefault(require("express"));
const service_1 = require("../service");
const middleware_1 = require("../middleware");
const middleware_2 = require("../middleware");
class CommandeController {
    createCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandeBody = req.body;
            if (!commandeBody === null) {
                res.status(401).end();
                return;
            }
            try {
                const commande = yield service_1.CommandeService.getInstance().createCommande({
                    product: commandeBody.product,
                    menu: commandeBody.menu,
                    price: commandeBody.price,
                    promotion: commandeBody.promotion
                });
                res.json(commande);
            }
            catch (err) {
                console.log(err);
                res.status(400).end();
                return;
            }
        });
    }
    getAllCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commande = yield service_1.CommandeService.getInstance().getAll();
            res.json(commande);
        });
    }
    getCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commande = yield service_1.CommandeService.getInstance().getById(req.params.commande_id);
                if (commande === null) {
                    res.status(404).end();
                    return;
                }
                res.json(commande);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    deleteCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield service_1.CommandeService.getInstance().deleteById(req.params.commande_id);
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
    updateCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commande = yield service_1.CommandeService.getInstance()
                    .updateById(req.params.commande_id, req.body);
                if (!commande) {
                    res.status(404).end();
                    return;
                }
                res.json(commande);
            }
            catch (err) {
                res.status(400).end();
            }
        });
    }
    buildRoutes() {
        const routeur = express_1.default.Router();
        routeur.use((0, middleware_1.checkUserConnected)());
        routeur.post('/', express_1.default.json(), this.createCommande.bind(this));
        routeur.get('/', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur"]), this.getAllCommande.bind(this));
        routeur.get('/:commande_id', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur", "livreur"]), this.getCommande.bind(this));
        routeur.delete('/:commande_id', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "livreur"]), this.deleteCommande.bind(this));
        routeur.put('/:commande_id', express_1.default.json(), (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur"]), this.updateCommande.bind(this));
        return routeur;
    }
}
exports.CommandeController = CommandeController;
//# sourceMappingURL=CommandeController.js.map