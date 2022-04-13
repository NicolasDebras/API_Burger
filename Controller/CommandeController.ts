import express, {Router, Request, Response} from "express";
import {CommandeService} from "../service";
import {checkUserConnected} from "../middleware";
import { checkUserRole } from "../middleware";

export class CommandeController{
    async createCommande(req: Request, res: Response){
        const commandeBody = req.body;
        if (!commandeBody === null ){
            res.status(400).end();
            return;
        }
        try {

            const commande = await CommandeService.getInstance().createCommande({
                nbrCommande: commandeBody.nbrCommande,
                product: commandeBody.product,
                menu: commandeBody.menu,
                price: commandeBody.price,
                promotion: commandeBody.promotion
            });
            res.json(commande);
        } catch (err){
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

    buildRoutes(): Router {
        const routeur = express.Router();
        //routeur.use(checkUserConnected());
        routeur.post('/', express.json(), this.createCommande.bind(this));
        routeur.get('/', this.getAllCommande.bind(this));
        routeur.get('/:commande_id', this.getCommande.bind(this));
        routeur.delete('/:commande_id', this.deleteCommande.bind(this));
        routeur.put('/:commande_id', express.json(),  this.updateCommande.bind(this));
        return routeur;
    }
}