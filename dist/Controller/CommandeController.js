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
const Product_1 = require("../class/Product");
const Commande_1 = require("../class/Commande");
class CommandeController {
    createCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandeBody = req.body;
            if (!commandeBody === null || !commandeBody.restaurant) {
                res.status(401).end();
                return;
            }
            let bearer = req.rawHeaders[1].split(" ");
            const connected = yield service_1.AuthService.getInstance().getById(bearer[1]);
            if ((connected === null || connected === void 0 ? void 0 : connected.role) == "customer") {
                commandeBody.user = connected._id;
            }
            else if ((connected === null || connected === void 0 ? void 0 : connected.role) != "customer" && !commandeBody.user) {
                return;
            }
            try {
                let priceCommande = 0;
                if (commandeBody.product || commandeBody.menu) {
                    priceCommande = +(yield Commande_1.Commande.priceCommande(commandeBody.product, commandeBody.menu));
                    if (!priceCommande) {
                        throw new Error("the price cannot be calculated");
                    }
                }
                else {
                    throw new Error("the price cannot be calculated");
                }
                const commande = yield service_1.CommandeService.getInstance().createCommande({
                    user: commandeBody.user,
                    product: commandeBody.product,
                    menu: commandeBody.menu,
                    price: priceCommande,
                    promotion: commandeBody.promotion,
                    restaurant: commandeBody.restaurant,
                    state: "start",
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
    stateUpdateCommande(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.state === "prepared") {
                    let commande = yield service_1.CommandeService.getInstance().getById(req.params.commande_id);
                    commande.state = req.params.state;
                    if (commande) {
                        const save = yield service_1.CommandeService.getInstance().UpdateOne(commande, commande._id);
                        if (save) {
                            commande = yield service_1.CommandeService.getInstance().getById(req.params.commande_id);
                            if (commande) {
                                let response = yield Product_1.Product.enoughIngredient(commande);
                                if (response === null || response === void 0 ? void 0 : response.size) {
                                    let result = yield Product_1.Product.supIngredient(response, commande.restaurant);
                                    if (result) {
                                        commande = yield service_1.CommandeService.getInstance().getById(req.params.commande_id);
                                        if (!commande) {
                                            res.status(404).end();
                                            return;
                                        }
                                        res.json(commande);
                                    }
                                }
                                else {
                                    throw new Error("The response doesn't size");
                                }
                            }
                            else {
                                throw new Error("Commande don't find");
                            }
                        }
                        else {
                            throw new Error("The Update don't work");
                        }
                    }
                    else {
                        throw new Error("Commande don't find");
                    }
                }
            }
            catch (err) {
                res.status(400).end();
            }
        });
    }
    buildRoutes() {
        const routeur = express_1.default.Router();
        routeur.use((0, middleware_1.checkUserConnected)());
        routeur.post('/', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur", "customer"]), express_1.default.json(), this.createCommande.bind(this));
        routeur.get('/', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur"]), this.getAllCommande.bind(this));
        routeur.get('/:commande_id', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur", "livreur"]), this.getCommande.bind(this));
        routeur.delete('/:commande_id', (0, middleware_2.checkUserRole)(["admin", "bigBoss", "livreur"]), this.deleteCommande.bind(this));
        routeur.put('/:commande_id', express_1.default.json(), (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur"]), this.updateCommande.bind(this));
        routeur.get('/:commande_id/:state/', express_1.default.json(), (0, middleware_2.checkUserRole)(["admin", "bigBoss", "preparateur", "livreur"]), this.stateUpdateCommande.bind(this));
        return routeur;
    }
}
exports.CommandeController = CommandeController;
//# sourceMappingURL=CommandeController.js.map