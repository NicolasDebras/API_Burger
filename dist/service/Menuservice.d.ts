export declare class MenuService {
    private static instance?;
    static getInstance(): MenuService;
    private constructor();
    createMenu(prop: MenuService): Promise<any>;
    getById(idMenu: string): Promise<any>;
}
