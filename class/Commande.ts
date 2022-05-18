import {Menu} from "./Menu";
import {Product} from "./Product";
import {PromotionService} from "../service";

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

    public static async priceCommandePromotion(product: [], menu: [], idPromotion: String): Promise<boolean | number>{
        let priceMenu: number | boolean =0;
        let priceProduct: number | boolean=0;

        if (!product && !menu && !idPromotion){
            return  false;
        }
        if (menu){
            priceMenu = await Menu.menuPrice(menu);
        }
        if (product){
            priceProduct = await Product.productPrice(product);
        }

        if (idPromotion){
           let promotion = await PromotionService.getInstance().getById(String(idPromotion));
           if (promotion){
               if (typeof(priceMenu)=="number" && typeof(priceProduct)=="number"){
                   return (priceMenu + priceProduct) * promotion.percentage / 100;
               }else if (typeof(priceMenu)!="number" && typeof(priceProduct)=="number"){
                   return priceProduct * promotion.percentage / 100;
               }else if (typeof(priceMenu)=="number" && typeof(priceProduct)!="number"){
                   return priceMenu * promotion.percentage / 100;
               }else{
                   return false;
               }
           }else{
               return false;
           }
        }else{
            return false;
        }

    }
}