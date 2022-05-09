import express,{ Router, Request,  Response} from "express";
import {Mongoose} from "mongoose";
import { RestaurantService } from "../service/RestaurantService";
import {checkUserConnected, checkUserRole} from "../middleware";

export class RestaurantController {

    async CreateRestaurant(req: Request, res: Response) {
        const RestaurantBody = req.body;
        if(!RestaurantBody.name || !RestaurantBody.Cordlat || !RestaurantBody.Cordlong) {
            res.status(400).end(); // 400 -> bad request
            return;
        }
        try {
            const Restaurant = await RestaurantService.getInstance().createRestaurant({
                name: RestaurantBody.name,
                Cordlat: RestaurantBody.Cordlat,
                Cordlong: RestaurantBody.Cordlong,
                user : RestaurantBody.user,
            });
            res.json(Restaurant);
        } catch(err) {
            res.status(400).end(); // erreur des données utilisateurs
            return;
        }

    }
    buildRoutes() : Router {
        const router = express.Router();
        router.use(checkUserConnected());
        router.post('/', checkUserRole(["bigBoss"]),express.json(), this.CreateRestaurant.bind(this))
        return router;
    }

}