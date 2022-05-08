import express, {json, Request} from "express";
import {CommandeProsp, ProductProsp} from "../model";
import {MenuService, ProductService} from "../service";
import {IngredientService} from "../service/IngredientService";



export class Product {

    public static async supIngredient(dictionnaryCommande: Map<string, number>) {
        for (let  [key, val] of dictionnaryCommande){
            let version = await IngredientService.getInstance().getById(key);
            console.log(version.quantity);
            version.quantity = version.quantity - val;
            await version.save();
        }
    }

    private static  async productCompt(dictionnaryCommande: Map<string, number>, dictionnaryStock: Map<string, number> , product: ProductProsp[]){
        for (let i = 0; i < product.length; i++) {
            let productOne = String(product[i]);
            let info = await ProductService.getInstance().getById(productOne);
            if (info?.recette !== undefined){
                let  recette = info.recette;
                for(let y=0; y < recette.length; y++){
                    let ingredient = await IngredientService.getInstance().getById(recette[y]["ingredient"]);
                    let quantity = Number(ingredient["quantity"]);
                    let objectId = String(recette[y]['ingredient']);
                    dictionnaryCommande.set(objectId ,recette[y]["num"]);
                    dictionnaryStock.set(objectId, quantity);
                }
            }
        }

    }

    public static async enoughIngredient(props: CommandeProsp): Promise< Map<string, number> > {
        let dictionnaryCommande = new Map<string, number>();
        let dictionnaryStock = new Map<string, number>();
        if (props.product !== undefined) {
            await this.productCompt(dictionnaryCommande, dictionnaryStock, props.product);
        }
        if (props.menu !== undefined) {
            for (let i = 0; i < props.menu.length; i++) {
                for (let y= 0; y < props.menu[i].product.length; y++){
                    await this.productCompt(dictionnaryCommande, dictionnaryStock, props.menu[i].product);
                }

            }
        }
        for (let  [key, val] of dictionnaryCommande){
            let value = dictionnaryStock.get(key);
            if (value !== undefined ){
                if (val > value  ){
                    return new Map<string, number>();
                }
            }
        }
        return dictionnaryCommande;
    }
}