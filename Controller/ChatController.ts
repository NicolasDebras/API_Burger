import express, {Router, Request, Response} from "express";
import {checkUserConnected} from "../middleware";
import { checkUserRole } from "../middleware";
import { ConversationService } from "../service/ConversationService";
import { isPropertySignature } from "typescript";
import { MessageProps } from "../model";

export class ChatController{


    async initConversation(req: Request, res: Response){
        const convBody = req.body;
        if (!convBody === null ){
            res.status(401).end();
            return;
        }
        try {

            const conv = await ConversationService.getInstance().createConversation({
                member_a: convBody.member_a,
                member_b: convBody.member_b,
                messages: <MessageProps[]>[]
            });

            res.json(conv);
        } catch (err){
            console.log(err);
            res.status(400).end();
            return;
        }
    }

    async postMessage(req: Request, res: Response){
        try {
            const conversation = await ConversationService.getInstance()
                .addMessage(req.params.convID, req.body);
            if(!conversation){
                res.status(404).end();
                return;
            }
            res.json(conversation);
        }catch (err){
            console.log(err)
            res.status(400).end();
        }
    }

    async getConversationForUser(req: Request, res: Response){
        const conversation = await ConversationService.getInstance().getByUserId(req.params.userID);
        res.json(conversation);
    }

    async getConversationByID(req: Request, res: Response){
        const conversation = await ConversationService.getInstance().getById(req.params.convID);
        res.json(conversation);
    }

    async getMessageDetails(req: Request, res: Response){
        const message = await ConversationService.getInstance().getMessageById(req.params.msgID);
        res.json(message);
    }


/*
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
    }*/

    buildRoutes(): Router {
        const routeur = express.Router();
        routeur.use(checkUserConnected());
        routeur.post('/new', express.json(), this.initConversation.bind(this));
        routeur.put('/send/:convID', express.json(), this.postMessage.bind(this));
        routeur.get('/user/:userID', this.getConversationForUser.bind(this));
        routeur.get('/conversation/:convID', this.getConversationByID.bind(this));
        routeur.get('/message/:msgID', this.getMessageDetails.bind(this));
        return routeur;
    }
}