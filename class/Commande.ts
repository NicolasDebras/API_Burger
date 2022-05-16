import {Menu} from "./Menu";
import {Product} from "./Product";

export class Commande {

    public static async priceCommande(product: [], menu: []): Promise<boolean | number>{
        let priceMenu: number | boolean =0;
        let priceProduct: number | boolean=0;
        if (!product && !menu){
            return  false;
        }
        if (menu){
            priceMenu = await Menu.menuPrice(menu);
        }
        if (product){
            priceProduct = await Product.productPrice(product);
        }
        if (typeof(priceMenu)=="number" && typeof(priceProduct)=="number"){
            return priceMenu + priceProduct;
        }else if (typeof(priceMenu)!="number" && typeof(priceProduct)=="number"){
            return priceProduct;
        }else if (typeof(priceMenu)=="number" && typeof(priceProduct)!="number"){
            return priceMenu;
        }
        return false;
    }
}