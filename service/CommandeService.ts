
import {ProductService} from "./ProductService";
import {CommandeDocument, CommandeModel, CommandeProsp} from "../model";
import {PromotionService} from "./PromotionService";
import {Schema} from "mongoose";
import {MenuService} from "./Menuservice";



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
        let max = 7000000;
        let min = 1;
        let nbr = (Math.random() * (max - min) + min) | 0 ;
        props.nbrCommande = "CB" + nbr;
        props.price = await this.priceCommande(props);
        const model = new CommandeModel(props);
        const commande = await model.save();
        return commande;
    }

    async priceCommande(props: CommandeProsp): Promise<number>{
        let i: number;
        let products = props.product;
        let menus = props.menu;
        let price: number ;
        price = 0;
        if( products !== undefined){
            for(i=0; i<products?.length; i++){
                let product = String(products[i]);
                const product1 = await ProductService.getInstance().getById(product);
                if (product1) {
                    const promotion1 = await  PromotionService.getInstance().getById(String(product1.promotion?._id));
                    if (promotion1?.percentage !== undefined) {
                        price = price + (product1.price - product1.price  *  promotion1?.percentage / 100);
                    } else {
                        price = price + product1.price ;
                    }
                }
            }
        }
        if( menus !== undefined){
            for(i=0; i<menus?.length; i++){
                let menu = String(menus[i]);
                const menu1 = await MenuService.getInstance().getById(menu);
                if (menu1 !== undefined ) {
                    const promotion1 = await  PromotionService.getInstance().getById(String(menu1.promotion?._id));
                    if (promotion1?.percentage !== undefined) {
                        price = price + (menu1.price - menu1.price  *  menu1?.percentage / 100);
                    } else {
                        price = price + menu1.price ;
                    }
                }
            }
        }
        return price;

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
}