import express,{ Router, Request,  Response} from "express";
import {Mongoose} from "mongoose";
import { RestaurantDocument } from "../model/RestaurantModel";
import { RestaurantService } from "../service/RestaurantService";
import {checkUserConnected} from "../middleware";
import { checkUserRole } from "../middleware";
import {AuthService} from "../service";
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
    async getAllRestaurant(req: Request, res: Response) {
        const Restaurants = await RestaurantService.getInstance().getAll();
        res.json(Restaurants);
    }

    async getRestaurant(req: Request, res: Response) {
        try {
            const Restaurant = await RestaurantService.getInstance().getById(req.params.Restaurant_id);
            if(Restaurant === null) {
                res.status(404).end();
                return;
            }
            res.json(Restaurant);
        } catch(err) {
            res.status(400).end();
            return;
        }
    }

    async deleteRestaurant(req: Request, res: Response) {
        try {
            const success = await RestaurantService.getInstance().deletebyId(req.params.Restaurant_id);
            if(success) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        } catch(err) {
            res.status(400).end();
        }
    }

    async updateRestaurant(req: Request, res: Response) {
        try {
            const Restaurant = await RestaurantService.getInstance()
                .Update(req.params.Restaurant_id, req.body);
            if(!Restaurant) {
                res.status(404).end();
                return;
            }
            res.json(Restaurant);
        } catch (err) {
            res.status(400).end();
        }
    }

    async getAllEmployesOneInRestaurant(req: Request, res: Response){
        try {
            const employers = await AuthService.getInstance().getByRestaurant(req.params.Restaurant_id);
            if(employers === null) {
                res.status(404).end();
                return;
            }
            res.json(employers);
        } catch(err) {
            res.status(400).end();
            return;
        }
    }

    buildRoutes() : Router {
        const router = express.Router();
        router.use(checkUserConnected());
        router.post('/', checkUserRole([ "bigBoss"]), express.json(), this.CreateRestaurant.bind(this))
        router.get('/employers/:Restaurant_id', checkUserRole(['bigBoss']), this.getAllEmployesOneInRestaurant.bind(this))
        router.get('/find/:Restaurant_id', checkUserRole(["bigBoss"]),express.json(), this.getRestaurant.bind(this))
        router.get('/all/',express.json(),checkUserRole(["bigBoss", "customer"]),  this.getAllRestaurant.bind(this))
        router.delete('/:Restaurant_id',checkUserRole(["bigBoss"]), this.deleteRestaurant.bind(this))
        router.put('/:Restaurant_id',checkUserRole(["bigBoss"]), express.json(), this.updateRestaurant.bind(this))
        return router;
    }

}