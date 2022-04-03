import { MenuModel } from "../model/MenuModel";

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

    public async createMenu(prop: MenuService) {
        const model = new MenuModel();
        const menu = await model.save();
        return menu;
    }
    public async getById(idMenu: string) {
        return MenuModel.findById(idMenu).exec();
    }
}