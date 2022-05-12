import {Request} from "express";
import {RestaurantService} from "../service/RestaurantService";
import {TupleType} from "typescript";

export class Restaurant{

    public static async cordonnateRestaurant(idRestaurant: string, req: Request): Promise<[number, number] | number >{
        let restaurant = await RestaurantService.getInstance().getById(idRestaurant);
        if (restaurant.Cordlat && restaurant.Cordlong){
            let coordinate: [number, number] = [restaurant.Cordlat , restaurant.Cordlong];
            return coordinate;
        }else{
            return 1;
        }
    }
}