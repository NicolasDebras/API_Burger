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
exports.RestaurantService = void 0;
const RestaurantModel_1 = require("../model/RestaurantModel");
class RestaurantService {
    constructor() {
    }
    static getInstance() {
        if (RestaurantService.instance === undefined) {
            RestaurantService.instance = new RestaurantService();
        }
        return RestaurantService.instance;
    }
    createRestaurant(restaurant) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            * Vérifiacation des conditions
            */
            const model = new RestaurantModel_1.RestaurantModel({
                name: restaurant.name,
                Cordlat: restaurant.Cordlat,
                Cordlong: restaurant.Cordlong,
                user: restaurant.user,
            });
            return model.save();
        });
    }
    getById(idRestaurant) {
        return __awaiter(this, void 0, void 0, function* () {
            return RestaurantModel_1.RestaurantModel.findById(idRestaurant).exec();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return RestaurantModel_1.RestaurantModel.find().exec();
        });
    }
    deletebyId(idRestaurant) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield RestaurantModel_1.RestaurantModel.deleteOne({ id: idRestaurant }).exec();
            return res.deletedCount === 1;
        });
    }
    Update(idRestaurant, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const restaurant = yield this.getById(idRestaurant);
            if (!restaurant == null) {
                return null;
            }
            if (restaurant.name !== undefined) {
                restaurant.name = props.name;
            }
            //a finir condition
            const res = yield restaurant.save();
            return res;
        });
    }
}
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=RestaurantService.js.map