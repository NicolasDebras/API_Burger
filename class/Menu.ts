import {MenuProsp} from "../model";
import {MenuService, ProductService, PromotionService} from "../service";

export class Menu {
    public static async verifyMenu(props: MenuProsp): Promise<boolean>{
        if (props.promotion){
            let promotion = await PromotionService.getInstance().getById(String(props.promotion));
            if (!promotion){
                return false;
            }
        }
        if (props.product){
            let product;
            for (let i=0; i<props.product.length;i++){
                product = await ProductService.getInstance().getById(String(props.product[i]));
                if (!product){
                    return false;
                }
            }
        }else{
            return false;
        }

        return true;
    }

    public static async menuPrice(menu: []): Promise<number | boolean >{
        let verif;
        let price=0;
        if (menu){
            for (let i=0; i<menu.length; i++){
                verif = await MenuService.getInstance().getById(String(menu[i]));
                if (!verif){
                    throw new Error("the price cannot be calculated");
                }
                price = price + verif.price;
            }
        }
        return price;
    }
}