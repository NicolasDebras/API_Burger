import express, {json, Request} from "express";
import {CommandeProsp, ProductProsp, RestaurantProsp} from "../model";
import {MenuService, ProductService} from "../service";
import {IngredientService} from "../service/IngredientService";
import {log} from "util";



export class Product {

    public static async supIngredient(dictionnaryCommande: Map<string, number>) {
        for (let  [key, val] of dictionnaryCommande){
            let version = await IngredientService.getInstance().getById(key);
            version.quantity = version.quantity - val;
            await version.save();
        }
    }

    private static  async productCompt(dictionnaryCommande: Map<string, number>, dictionnaryStock: Map<string, number> , product: ProductProsp[], restaurantId: RestaurantProsp){
        for (let i = 0; i < product.length; i++) {
            let productOne = String(product[i]);
            let info = await ProductService.getInstance().getById(productOne);
            if (info?.recette !== undefined){
                let  recette = info.recette;
                for(let y=0; y < recette.length; y++){
                    let ingredient = await IngredientService.getInstance().IngredientRestaurant(recette[y]["ingredient"], restaurantId.id);
                    if (ingredient) {
                        let quantity = Number(ingredient["quantity"]);
                        let objectId = String(recette[y]['ingredient']);
                        dictionnaryCommande.set(objectId ,recette[y]["num"]);
                        dictionnaryStock.set(objectId, quantity);
                    }

                }
            }
        }

    }

    public static async enoughIngredient(props: CommandeProsp): Promise< Map<string, number> |null > {
        let dictionnaryCommande = new Map<string, number>();
        let dictionnaryStock = new Map<string, number>();
        if (props.product !== undefined) {
            await this.productCompt(dictionnaryCommande, dictionnaryStock, props.product, props.restaurant);
        }

        if (props.menu !== undefined) {
            for (let i = 0; i < props.menu.length; i++) {
                let products =  await  MenuService.getInstance().getById(String(props.menu[i]));
                let change: string[] = products.product
               for (let y= 0; y < change.length; y++){
                    await this.productCompt(dictionnaryCommande, dictionnaryStock, props.menu[i].product, props.restaurant);
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

    public static async verifGoodIngredient(recette: []): Promise<boolean>{
        let success;
        if (recette ){
            for(let i=0; i<recette?.length; i++){
                 success = await IngredientService.getInstance().getById(String(recette[i]["ingredient"]));
                 if (!success || success.stock==true){
                     return false;
                 }
            }
            return true;
        }

        return false;
    }

    public static async productPrice(product: String[] | undefined): Promise<boolean | number>{
        let price=0;
        let verif;
        if (product){
            for (let i=0; i<product.length; i++){
                verif = await ProductService.getInstance().getById(String(product[i]));
                if (!verif){
                    throw new Error("the price cannot be calculated");
                }
                price = price + verif.price;
            }
        }
        return price;
    }

}