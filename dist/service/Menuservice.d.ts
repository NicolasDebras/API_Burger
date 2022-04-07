import { MenuDocument, MenuProsp } from "../model/MenuModel";
export declare class MenuService {
    private static instance?;
    static getInstance(): MenuService;
    private constructor();
    createMenu(props: MenuProsp): Promise<MenuDocument>;
    getAll(): Promise<MenuDocument[]>;
    getById(idMenu: string): Promise<any>;
    deleteById(menuId: string): Promise<boolean>;
    updateById(menuId: string, props: MenuProsp): Promise<MenuDocument | null>;
}