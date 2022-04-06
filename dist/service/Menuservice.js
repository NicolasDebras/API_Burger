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
exports.MenuService = void 0;
const MenuModel_1 = require("../model/MenuModel");
class MenuService {
    constructor() {
    }
    static getInstance() {
        if (MenuService.instance === undefined) {
            MenuService.instance = new MenuService();
        }
        return MenuService.instance;
    }
    createMenu(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = new MenuModel_1.MenuModel(props);
            const menu = yield model.save();
            return menu;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return MenuModel_1.MenuModel.find().exec();
        });
    }
    getById(idMenu) {
        return __awaiter(this, void 0, void 0, function* () {
            return MenuModel_1.MenuModel.findById(idMenu).exec();
        });
    }
    deleteById(menuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield MenuModel_1.MenuModel.deleteOne({ _id: menuId }).exec();
            return res.deletedCount === 1;
        });
    }
    updateById(menuId, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield this.getById(menuId);
            if (!menu) {
                return null;
            }
            if (props.name !== undefined) {
                menu.name = props.name;
            }
            if (props.price !== undefined) {
                menu.price = props.price;
            }
            if (props.promotion !== undefined) {
                menu.promotion = props.promotion;
            }
            if (props.product !== undefined) {
                menu.product = props.product;
            }
            const res = yield menu.save();
            return res;
        });
    }
}
exports.MenuService = MenuService;
//# sourceMappingURL=Menuservice.js.map