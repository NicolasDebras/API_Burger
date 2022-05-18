import express, {Router, Request, Response} from "express";
import {AuthService, CommandeService} from "../service";
import {checkUserConnected} from "../middleware";
import { checkUserRole } from "../middleware";
import {Product} from "../class/Product";
import {Commande} from "../class/Commande";

export class CommandeController{
    async createCommande(req: Request, res: Response){

        const commandeBody = req.body;
        if (!commandeBody === null || !commandeBody.restaurant  ){
            res.status(401).end();
            return;
        }
        let bearer= req.rawHeaders[1].split(" ");
        const connected = await AuthService.getInstance().getById(bearer[1]);
        if (connected?.role == "customer"){
            commandeBody.user = connected._id;
        }else if (connected?.role != "customer" && !commandeBody.user){
            return ;
        }
        try {
            let priceCommande=0;

            if (commandeBody.product || commandeBody.menu){
                if (commandeBody.promotion){
                    priceCommande =+ await Commande.priceCommandePromotion(commandeBody.product, commandeBody.menu, commandeBody.promotion);
                }else {
                    priceCommande =+ await Commande.priceCommande(commandeBody.product, commandeBody.menu);
                }
                if (!priceCommande){
                    throw new Error("the price cannot be calculated");
                }
            }else{
                throw new Error("the price cannot be calculated");
            }

            const commande = await CommandeService.getInstance().createCommande({
                user: commandeBody.user,
                product: commandeBody.product,
                menu: commandeBody.menu,
                price: priceCommande,
                promotion: commandeBody.promotion,
                restaurant: commandeBody.restaurant,
                state: "start",
            });

            res.json(commande);
        } catch (err){
            console.log(err);
            res.status(400).end();
            return;
        }
    }

    async getAllCommande(req: Request, res: Response){
        const commande = await CommandeService.getInstance().getAll();
        res.json(commande);
    }

    async getCommande(req: Request, res: Response){
        try {
            const commande = await CommandeService.getInstance().getById(req.params.commande_id);
            if (commande === null){
                res.status(404).end();
                return;
            }
            res.json(commande);
        }catch (err){
            res.status(400).end();
            return;
        }
    }

    async deleteCommande(req: Request, res: Response){
        try {
            const success = await CommandeService.getInstance().deleteById(req.params.commande_id);
            if (success){
                res.status(204).end();
            }else {
                res.status(404).end();
            }
        }catch (err){
            res.status(400).end();
        }
    }

    async updateCommande(req: Request, res: Response){
        try {
            const commande = await CommandeService.getInstance()
                .updateById(req.params.commande_id, req.body);
            if(!commande){
                res.status(404).end();
                return;
            }
            res.json(commande);
        }catch (err){
            res.status(400).end();
        }
    }

    async stateUpdateCommande(req: Request, res: Response){
        try {
            if (req.params.state=== "prepared") {
                let commande = await CommandeService.getInstance().getById(req.params.commande_id);
                commande.state = req.params.state;
                if (commande) {
                    const save = await CommandeService.getInstance().UpdateOne(commande, commande._id)
                    if (save) {
                        commande = await CommandeService.getInstance().getById(req.params.commande_id);
                        if (commande) {
                            let response = await Product.enoughIngredient(commande);
                            if (response?.size) {
                                let result =  await Product.supIngredient(response, commande.restaurant);
                                if (result){
                                    commande = await CommandeService.getInstance().getById(req.params.commande_id);
                                    if(!commande){
                                        res.status(404).end();
                                        return;
                                    }
                                    res.json(commande);
                                }
                            }else{
                                throw new Error("The response doesn't size");
                            }
                        }else{
                            throw new Error("Commande don't find");
                        }
                    }else{
                        throw new Error("The Update don't work");
                    }
                }else{
                    throw new Error("Commande don't find");
                }
            }else if(req.params.state=== "finish"){
                let commande = await CommandeService.getInstance().getById(req.params.commande_id);
                commande.state = req.params.state;
                if (commande){
                    const save = await CommandeService.getInstance().UpdateOne(commande, commande._id)
                    if (save) {
                        commande = await CommandeService.getInstance().getById(req.params.commande_id);
                        res.json(commande);
                    }else {
                        throw new Error("Commande don't find");
                    }
                }else{
                    throw new Error("Commande don't find");
                }
            }else{
                throw new Error("The state not existing");
            }
        }catch (err){
            res.status(400).end();
        }
    }

    buildRoutes(): Router {
        const routeur = express.Router();
        routeur.use(checkUserConnected());
        routeur.post('/',checkUserRole(["admin", "bigBoss", "preparateur", "customer"]) , express.json(), this.createCommande.bind(this));
        routeur.get('/',checkUserRole(["admin", "bigBoss", "preparateur"]),  this.getAllCommande.bind(this));
        routeur.get('/:commande_id',checkUserRole(["admin", "bigBoss", "preparateur", "livreur"]), this.getCommande.bind(this));
        routeur.delete('/:commande_id',checkUserRole(["admin", "bigBoss", "livreur"]),  this.deleteCommande.bind(this));
        routeur.put('/:commande_id', express.json(),checkUserRole(["admin", "bigBoss", "preparateur"]),  this.updateCommande.bind(this));
        routeur.get('/:commande_id/:state/', express.json(),checkUserRole(["admin", "bigBoss", "preparateur", "livreur"]),  this.stateUpdateCommande.bind(this));
        return routeur;
    }
}