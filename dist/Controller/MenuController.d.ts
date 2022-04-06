import { Router, Request, Response } from "express";
export declare class MenuController {
    createMenu(req: Request, res: Response): Promise<void>;
    getAllMenu(req: Request, res: Response): Promise<void>;
    getMenu(req: Request, res: Response): Promise<void>;
    deleteMenu(req: Request, res: Response): Promise<void>;
    updateMenu(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
