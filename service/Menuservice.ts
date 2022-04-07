import {MenuDocument, MenuModel, MenuProsp} from "../model/MenuModel";

export class MenuService {

    private static instance?: MenuService

    public static getInstance() : MenuService {
        if (MenuService.instance === undefined) {
            MenuService.instance = new MenuService();
        }
        return MenuService.instance;
    }

    private constructor() {

    }

    public async createMenu(props: MenuProsp): Promise<MenuDocument>{
        const model = new MenuModel(props);
        const menu = await model.save();
        return menu;
    }

    async getAll(): Promise<MenuDocument[]> {
        return MenuModel.find().exec();
    }

    public async getById(idMenu: string) {
        return MenuModel.findById(idMenu).exec();
    }

    async deleteById(menuId: string): Promise<boolean>{
        const res = await MenuModel.deleteOne({_id: menuId}).exec();
        return res.deletedCount === 1;
    }

    async updateById(menuId: string, props: MenuProsp): Promise<MenuDocument | null> {
        const menu = await this.getById(menuId);
        if(!menu){
            return null;
        }
        if(props.name !== undefined){
            menu.name = props.name;
        }
        if (props.price !== undefined){
            menu.price = props.price;
        }
        if (props.promotion !== undefined){
            menu.promotion = props.promotion;
        }
        if (props.product !== undefined){
            menu.product = props.product;
        }

        const res = await menu.save();
        return res;
    }
}