import { RestaurantDocument, RestaurantModel, RestaurantProsp } from "../model/RestaurantModel";

export class RestaurantService {

    private static instance?: RestaurantService

    public static getInstance() : RestaurantService {
        if (RestaurantService.instance === undefined) {
            RestaurantService.instance = new RestaurantService();
        }
        return RestaurantService.instance;
    }

    private constructor() {

    }

    public async createRestaurant(restaurant: Partial<RestaurantProsp>) : Promise<RestaurantDocument> {
        /*
        * Vérifiacation des conditions
        */
       const model = new RestaurantModel({
            name: restaurant.name,
            Cordlat: restaurant.Cordlat,
            Cordlong: restaurant.Cordlong,
            user : restaurant.user,
            stock : restaurant.stock
       })
       return model.save();
    }
    public async getById(idRestaurant: string) {
        return RestaurantModel.findById(idRestaurant).exec();
    }

    public async getAll() {
        return RestaurantModel.find().exec();
    }
    
    public async deletebyId(idRestaurant: string) {
        const res = await RestaurantModel.deleteOne({id:idRestaurant}).exec();
        return res.deletedCount === 1;
    }
    public async Update(idRestaurant: string, props: RestaurantProsp) {
        const restaurant = await this.getById(idRestaurant);

        if (! restaurant == null) {
            return null;
        }
        if (restaurant.name !==  undefined) {
            restaurant.name = props.name;
        }
        //a finir condition
        
        const res = await restaurant.save()
        return res;
    }
}