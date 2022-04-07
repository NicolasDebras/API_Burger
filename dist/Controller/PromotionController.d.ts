import { Router, Request, Response } from "express";
export declare class PromotionController {
    createPromotion(req: Request, res: Response): Promise<void>;
    getAllPromotions(req: Request, res: Response): Promise<void>;
    getPromotion(req: Request, res: Response): Promise<void>;
    deletePromotion(req: Request, res: Response): Promise<void>;
    updatePromotion(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
