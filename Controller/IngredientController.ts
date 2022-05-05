import { IngredientService } from "../service/IngredientService";
import express,{ Router, Request,  Response} from "express";
import {Mongoose} from "mongoose";

export class IngredientController {

    async createIngredient(req: Request, res: Response){
        const IngredientBody = req.body;
        if (!IngredientBody.name || !IngredientBody.price || !IngredientBody.quantity){
            res.status(400).end();
            return;
        }
        try {
            const ingredient= await IngredientService.getInstance().createIngredient( {
                name: IngredientBody.name,
                price: IngredientBody.price,
                quantity: IngredientBody.quantity
            } ) ;
            res.json(ingredient);
        } catch (err){
            res.status(400).end();
            return;
        }
    }

    async getAllIngredient(req: Request, res: Response){
        const promotions = await IngredientService.getInstance().getAll();
        res.json(promotions);
    }

    async getIngredient(req: Request, res: Response){
        try {
            const Ingredient = await IngredientService.getInstance().getById(req.params.Ingredient_id);
            if (Ingredient === null){
                res.status(404).end();
                return;
            }
            res.json(Ingredient);
        }catch (err){
            res.status(400).end();
            return;
        }
    }

    async deleteIngredient(req: Request, res: Response){
        try {
            const success = await IngredientService.getInstance().deleteById(req.params.Ingredient_id);
            if (success){
                res.status(204).end();
            }else {
                res.status(404).end();
            }
        }catch (err){
            res.status(400).end();
        }
    }

    async updateIngredient(req: Request, res: Response){
        try {
            const Ingredient = await IngredientService.getInstance()
                .updateById(req.params.Ingredient_id, req.body);
            if(!Ingredient){
                res.status(404).end();
                return;
            }
            res.json(Ingredient);
        }catch (err){
            res.status(400).end();
        }
    }

    buildRoutes(): Router {
        const routeur = express.Router();
        routeur.post('/', express.json(), this.createIngredient.bind(this));
        routeur.get('/', this.getAllIngredient.bind(this));
        routeur.get('/:Ingredient_id', this.getIngredient.bind(this));
        routeur.delete('/:Ingredient_id', this.deleteIngredient.bind(this));
        routeur.put('/:Ingredient_id', express.json(),  this.updateIngredient.bind(this));
        return routeur;
    }

}