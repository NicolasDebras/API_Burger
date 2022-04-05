import { RestaurantDocument, RestaurantProsp } from "../model/RestaurantModel";
export declare class RestaurantService {
    private static instance?;
    static getInstance(): RestaurantService;
    private constructor();
    createRestaurant(restaurant: Partial<RestaurantProsp>): Promise<RestaurantDocument>;
    getById(idRestaurant: string): Promise<any>;
    deletebyId(idRestaurant: string): Promise<boolean>;
    Update(idRestaurant: string, props: RestaurantService): Promise<any>;
}
