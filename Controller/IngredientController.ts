import { IngredientService } from "../service/IngredientService";
import express,{ Router, Request,  Response} from "express";
import {Mongoose} from "mongoose";
import {checkUserConnected, checkUserRole} from "../middleware";
import {IngredientModel} from "../model/ingredientModel";
import {type} from "os";
import {json} from "express/ts4.0";
import {RestaurantService} from "../service/RestaurantService";

export class IngredientController {

    async createIngredient(req: Request, res: Response){
        const IngredientBody = req.body;
        if (typeof(IngredientBody.stock)=== typeof("boolean")){
            res.status(400).end();
            return;
        }else if(IngredientBody.stock == false && !IngredientBody.name  ){
            res.status(400).end();
            return;
        }else if (IngredientBody.stock == true && (!IngredientBody.quantity || !IngredientBody.ingredient || !IngredientBody.restaurant)){
            res.status(400).end();
            return;
        }
        try {
            let ingredient;
            if (IngredientBody.stock == false){
                ingredient= await IngredientService.getInstance().createIngredient( {
                    name: IngredientBody.name,
                    stock: IngredientBody.stock,
                } ) ;
            }else{
                let verif = await IngredientService.getInstance().getById(IngredientBody.ingredient);
                if(!verif){
                    throw new Error("Le modèle d'ingrédient n'existe pas");
                }
                let restaurant = await RestaurantService.getInstance().getById(IngredientBody.restaurant);
                if(!restaurant){
                    throw new Error("Restaurant don't find");
                }
                let makeAlready = await IngredientService.getInstance().verifIngredientProduct(IngredientBody.ingredient, IngredientBody.restaurant);
                if (makeAlready){
                    throw new Error("The ingredient exist");
                }
                ingredient = await IngredientService.getInstance().createIngredient( {
                    name: verif.name,
                    quantity: IngredientBody.quantity,
                    stock: IngredientBody.stock,
                    ingredient: IngredientBody.ingredient,
                    restaurant: IngredientBody.restaurant,
                } ) ;
            }
            res.json(ingredient);

        } catch (err){
            console.log(err);
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
        routeur.use(checkUserConnected());
        routeur.post('/',checkUserRole(["admin", "bigBoss"]),  express.json(), this.createIngredient.bind(this));
        routeur.get('/', checkUserRole(["admin", "bigBoss", "preparateur"]), this.getAllIngredient.bind(this));
        routeur.get('/:Ingredient_id', checkUserRole(["admin", "bigBoss", "preparateur"]), this.getIngredient.bind(this));
        routeur.delete('/:Ingredient_id',checkUserRole(["admin", "bigBoss"]),  this.deleteIngredient.bind(this));
        routeur.put('/:Ingredient_id', checkUserRole(["admin", "bigBoss"]),express.json(),  this.updateIngredient.bind(this));
        return routeur;
    }

}