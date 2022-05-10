import express, {Router, Request, Response} from "express";
import {PromotionService} from "../service/PromotionService";
import {checkUserConnected, checkUserRole} from "../middleware";


export class PromotionController {

    async createPromotion( req: Request, res: Response) {
        const promotionBody = req.body;
        if (!promotionBody.name || ! promotionBody.percentage ){
            res.status(400).end();
            return;
        }
        try {
            const promotion = await PromotionService.getInstance().createPromotion({
                name: promotionBody.name,
                percentage: promotionBody.percentage
            });
            res.json(promotion);
        } catch (err){
            res.status(400).end();
            return;
        }
    }

    async getAllPromotions(req: Request, res: Response){
        const promotions = await PromotionService.getInstance().getAll();
        res.json(promotions);
    }

    async getPromotion(req: Request, res: Response){
        try {
            const promotion = await PromotionService.getInstance().getById(req.params.promotion_id);
            if (promotion === null){
                res.status(404).end();
                return;
            }
            res.json(promotion);
        }catch (err){
            res.status(400).end();
            return;
        }
    }

    async deletePromotion(req: Request, res: Response){
        try {
            const success = await PromotionService.getInstance().deleteById(req.params.promotion_id);
            if (success){
                res.status(204).end();
            }else {
                res.status(404).end();
            }
        }catch (err){
            res.status(400).end();
        }
    }

    async updatePromotion(req: Request, res: Response){
        try {
            const promotion = await PromotionService.getInstance()
                .updateById(req.params.promotion_id, req.body);
            if(!promotion){
                res.status(404).end();
                return;
            }
            res.json(promotion);
        }catch (err){
            res.status(400).end();
        }
    }

    buildRoutes(): Router {
        const routeur = express.Router();
        routeur.use(checkUserConnected());
        routeur.post('/',  checkUserRole(["admin", "bigBoss"]), express.json(), this.createPromotion.bind(this));
        routeur.get('/', checkUserRole(["admin", "bigBoss", "customer"]), this.getAllPromotions.bind(this));
        routeur.get('/:promotion_id', checkUserRole(["admin", "bigBoss", "customer"]), this.getPromotion.bind(this));
        routeur.delete('/:promotion_id', checkUserRole(["admin", "bigBoss"]), this.deletePromotion.bind(this));
        routeur.put('/:promotion_id', checkUserRole(["admin", "bigBoss"]), express.json(),  this.updatePromotion.bind(this));
        return routeur;
    }
}