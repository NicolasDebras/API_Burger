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
exports.RestaurantController = void 0;
const express_1 = __importDefault(require("express"));
const RestaurantService_1 = require("../service/RestaurantService");
const middleware_1 = require("../middleware");
class RestaurantController {
    CreateRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const RestaurantBody = req.body;
            if (!RestaurantBody.name || !RestaurantBody.Cordlat || !RestaurantBody.Cordlong) {
                res.status(400).end(); // 400 -> bad request
                return;
            }
            try {
                const Restaurant = yield RestaurantService_1.RestaurantService.getInstance().createRestaurant({
                    name: RestaurantBody.name,
                    Cordlat: RestaurantBody.Cordlat,
                    Cordlong: RestaurantBody.Cordlong,
                    user: RestaurantBody.user,
                });
                res.json(Restaurant);
            }
            catch (err) {
                res.status(400).end(); // erreur des données utilisateurs
                return;
            }
        });
    }
    buildRoutes() {
        const router = express_1.default.Router();
        router.use((0, middleware_1.checkUserConnected)());
        router.post('/', (0, middleware_1.checkUserRole)(["bigBoss"]), express_1.default.json(), this.CreateRestaurant.bind(this));
        return router;
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=RestaurantService.js.map