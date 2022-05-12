import express, {Router, Request, Response} from "express";
import {MenuService} from "../service/Menuservice";
import {checkUserConnected, checkUserRole} from "../middleware";



export class MenuController {

    async createMenu(req: Request, res: Response){
        const menuBody = req.body;
        if (!menuBody.name || !menuBody.product || !menuBody.price){
            res.status(400).end();
            return;
        }
        if (!menuBody.promote){
            menuBody.promote = 0;
        }
        try {
            const menu= await MenuService.getInstance().createMenu({
                name: menuBody.name,
                price: menuBody.price,
                product: menuBody.product,
                promotion: menuBody.promotion,
                promote: menuBody.promote
            });
            res.json(menu);
        } catch (err){
            res.status(400).end();
            return;
        }
    }

    async getAllMenu(req: Request, res: Response){
        const promotions = await MenuService.getInstance().getAll();
        res.json(promotions);
    }

    async getMenu(req: Request, res: Response){
        try {
            const menu = await MenuService.getInstance().getById(req.params.menu_id);
            if (menu === null){
                res.status(404).end();
                return;
            }
            res.json(menu);
        }catch (err){
            res.status(400).end();
            return;
        }
    }

    async deleteMenu(req: Request, res: Response){
        try {
            const success = await MenuService.getInstance().deleteById(req.params.menu_id);
            if (success){
                res.status(204).end();
            }else {
                res.status(404).end();
            }
        }catch (err){
            res.status(400).end();
        }
    }

    async updateMenu(req: Request, res: Response){
        try {
            if (!req.body.promote){
                req.body.promote = 0;
            }
            const menu = await MenuService.getInstance()
                .updateById(req.params.menu_id, req.body);
            if(!menu){
                res.status(404).end();
                return;
            }
            res.json(menu);
        }catch (err){
            res.status(400).end();
        }
    }

    buildRoutes(): Router {
        const routeur = express.Router();
        routeur.use(checkUserConnected());
        routeur.post('/', checkUserRole(["admin", "bigBoss"]), express.json(), this.createMenu.bind(this));
        routeur.get('/', checkUserRole(["admin", "bigBoss", "preparateur", "customer"]), this.getAllMenu.bind(this));
        routeur.get('/:menu_id',checkUserRole(["admin", "bigBoss", "preparateur", "customer"]), this.getMenu.bind(this));
        routeur.delete('/:menu_id',checkUserRole(["admin", "bigBoss"]), this.deleteMenu.bind(this));
        routeur.put('/:menu_id', checkUserRole(["admin", "bigBoss"]), express.json(),  this.updateMenu.bind(this));
        return routeur;
    }
}