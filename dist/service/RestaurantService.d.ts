import { RestaurantDocument, RestaurantProsp } from "../model/RestaurantModel";
export declare class RestaurantService {
    private static instance?;
    static getInstance(): RestaurantService;
    private constructor();
    createRestaurant(restaurant: Partial<RestaurantProsp>): Promise<RestaurantDocument>;
    getById(idRestaurant: string): Promise<RestaurantDocument>;
    getAll(): Promise<RestaurantDocument[]>;
    deletebyId(idRestaurant: string): Promise<boolean>;
    Update(idRestaurant: string, props: RestaurantProsp): Promise<RestaurantProsp | null>;
}
