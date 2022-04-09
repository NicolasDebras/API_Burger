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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const RestaurantController_1 = require("./Controller/RestaurantController");
const Controller_1 = require("./Controller");
const PromotionController_1 = require("./Controller/PromotionController");
const MenuController_1 = require("./Controller/MenuController");
const auth_controller_1 = require("./Controller/auth.controller");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`${process.env.MONGO_URI}`);
        const app = (0, express_1.default)();
        const productController = new Controller_1.ProductController();
        app.use('/product', productController.buildRoutes());
        const promotionController = new PromotionController_1.PromotionController();
        app.use('/promotion', promotionController.buildRoutes());
        const menuController = new MenuController_1.MenuController();
        app.use('/menu', menuController.buildRoutes());
        const commandeController = new Controller_1.CommandeController();
        app.use('/commande', commandeController.buildRoutes());
        const restaurantController = new RestaurantController_1.RestaurantController();
        app.use('/rest', restaurantController.buildRoutes());
        const authController = new auth_controller_1.AuthController();
        app.use('/auth', authController.buildRoutes());
        app.listen(process.env.PORT, function () {
            console.log("Server listening on port " + process.env.PORT);
        });
    });
}
startServer().catch(console.error);
//# sourceMappingURL=index.js.map