import {MenuProsp} from "../model";
import {ProductService, PromotionService} from "../service";

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
}