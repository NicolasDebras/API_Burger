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
exports.MenuController = void 0;
const express_1 = __importDefault(require("express"));
const Menuservice_1 = require("../service/Menuservice");
class MenuController {
    createMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuBody = req.body;
            if (!menuBody.name || !menuBody.product || !menuBody.product) {
                res.status(400).end();
                return;
            }
            try {
                const menu = yield Menuservice_1.MenuService.getInstance().createMenu({
                    name: menuBody.name,
                    price: menuBody.price,
                    product: menuBody.product,
                    promotion: menuBody.promotion
                });
                res.json(menu);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    getAllMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotions = yield Menuservice_1.MenuService.getInstance().getAll();
            res.json(promotions);
        });
    }
    getMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield Menuservice_1.MenuService.getInstance().getById(req.params.menu_id);
                if (menu === null) {
                    res.status(404).end();
                    return;
                }
                res.json(menu);
            }
            catch (err) {
                res.status(400).end();
                return;
            }
        });
    }
    deleteMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield Menuservice_1.MenuService.getInstance().deleteById(req.params.menu_id);
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
    updateMenu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield Menuservice_1.MenuService.getInstance()
                    .updateById(req.params.menu_id, req.body);
                if (!menu) {
                    res.status(404).end();
                    return;
                }
                res.json(menu);
            }
            catch (err) {
                res.status(400).end();
            }
        });
    }
    buildRoutes() {
        const routeur = express_1.default.Router();
        routeur.post('/', express_1.default.json(), this.createMenu.bind(this));
        routeur.get('/', this.getAllMenu.bind(this));
        routeur.get('/:menu_id', this.getMenu.bind(this));
        routeur.delete('/:menu_id', this.deleteMenu.bind(this));
        routeur.put('/:menu_id', express_1.default.json(), this.updateMenu.bind(this));
        return routeur;
    }
}
exports.MenuController = MenuController;
//# sourceMappingURL=MenuController.js.map