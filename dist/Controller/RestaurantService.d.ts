import { Router, Request, Response } from "express";
export declare class RestaurantController {
    CreateRestaurant(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
