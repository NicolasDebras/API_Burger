
import {ProductService} from "./ProductService";
import {CommandeDocument, CommandeModel, CommandeProsp} from "../model";
import {PromotionService} from "./PromotionService";
import {Schema} from "mongoose";
import {MenuService} from "./Menuservice";
import {Product} from "../class/Product";
import {Commande} from "../class/Commande";



export class CommandeService{
    private static instance?:CommandeService;

    public static getInstance() : CommandeService {
        if (CommandeService.instance === undefined) {
            CommandeService.instance = new CommandeService();
        }
        return CommandeService.instance;
    }

    private constructor() {

    }

    public async createCommande(props: CommandeProsp): Promise<CommandeDocument>{
        let test = await  Product.enoughIngredient(props);
        if(test?.size == 0){
            throw new Error("Erreur ingrédient");
        }
        let max = 7000000;
        let min = 1;
        let nbr = (Math.random() * (max - min) + min) | 0 ;
        props.nbrCommande = "CB" + nbr;
        const model = new CommandeModel(props);
        const commande = await model.save();
        return commande;
    }


    async getAll(): Promise<CommandeDocument[]> {
        return CommandeModel.find().exec();
    }

    public async getById(idCommande: string) {
        return CommandeModel.findById(idCommande).exec();
    }

    async deleteById(commandeId: string): Promise<boolean>{
        const res = await CommandeModel.deleteOne({_id: commandeId}).exec();
        return res.deletedCount === 1;
    }

    async updateById(commandeId: string, props: CommandeProsp): Promise<CommandeDocument | null> {
        console.log(props)
        const commande = await this.getById(commandeId);
        if(!commande){
            return null;
        }
        if (props.nbrCommande !== undefined){
            commande.nbrCommande = props.nbrCommande;
        }
        if (props.menu !== undefined){
            commande.menu = props.menu;
        }
        if (props.product !== undefined){
            commande.product = props.product;
        }
        if(props.promotion !== undefined){
            commande.promotion = props.promotion;
        }
        if (props.price !== undefined){
            commande.price = props.price;
        }
        if (props.price !== undefined){
            commande.price = props.price;
        }
        const res = await commande.save();
        return res;
    }

    async UpdateOne(commande: CommandeProsp, commandeId: String): Promise<boolean>{
        const filter = { _id: commandeId};
        const update = { state: commande.state };
        let doc = await CommandeModel.findOneAndUpdate(filter, update);
        if (doc){
            return true;
        }
        return false;
    }


}