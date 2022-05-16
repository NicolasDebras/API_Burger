import { Router, Request, Response } from "express";
export declare class CommandeController {
    createCommande(req: Request, res: Response): Promise<void>;
    getAllCommande(req: Request, res: Response): Promise<void>;
    getCommande(req: Request, res: Response): Promise<void>;
    deleteCommande(req: Request, res: Response): Promise<void>;
    updateCommande(req: Request, res: Response): Promise<void>;
    stateUpdateCommande(req: Request, res: Response): Promise<void>;
    buildRoutes(): Router;
}
