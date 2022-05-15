import express, {Router, Request, Response} from "express";
import {ProductService} from "../service/ProductService";
import {checkUserConnected} from "../middleware";
import { checkUserRole } from "../middleware";
import {Product} from "../class/Product";

export class  ProductController {

    async createProduct( req: Request, res: Response) {
        const productBody = req.body;
        if (!productBody.name || ! productBody.price || !productBody.recette){
            res.status(400).end();
            return;
        }

        if(!productBody.promote){
            productBody.promote =false;
        }

        try {
            let test = await  Product.verifGoodIngredient(productBody.recette);
            if (!test){
                throw new Error("An ingredient does not exist");
            }
            const product = await ProductService.getInstance().createProduct({
                name: productBody.name,
                recette: productBody.recette,
                price: productBody.price,
                promotion: productBody.promotion,
                promote: productBody.promote
            });
            res.json(product);
        } catch (err){
            res.status(400).end();
            return;
        }
    }

    async getAllProducts(req: Request, res: Response){
        const products = await ProductService.getInstance().getAll();
        res.json(products);
    }

    async getProduct(req: Request, res: Response){
        try {
            const product = await ProductService.getInstance().getById(req.params.product_id);
            if (product === null){
                res.status(404).end();
                return;
            }
            res.json(product);
        }catch (err){
            res.status(400).end();
            return;
        }
    }

    async deleteProduct(req: Request, res: Response){
        try {
            const success = await ProductService.getInstance().deleteById(req.params.product_id);
            if (success){
                res.status(204).end();
            }else {
                res.status(404).end();
            }
        }catch (err){
            res.status(400).end();
        }
    }

    async updateProduct(req: Request, res: Response){
        try {
            if(!req.body.promote){
                req.body.promote =0;
            }
            const product = await ProductService.getInstance()
                .updateById(req.params.product_id, req.body);
            if(!product){
                res.status(404).end();
                return;
            }

            res.json(product);
        }catch (err){
            res.status(400).end();
        }
    }

    buildRoutes(): Router {
        
        const routeur = express.Router();
        routeur.use(checkUserConnected());
        routeur.post('/', checkUserRole(["admin", "bigBoss", "preparateur","customer"]),express.json(), this.createProduct.bind(this));
        //Exemple pour protéger avec un rôle : 
        routeur.get('/', checkUserRole(["admin", "bigBoss", "preparateur","customer"]), this.getAllProducts.bind(this));
        routeur.get('/:product_id',checkUserRole(["admin", "bigBoss", "preparateur","customer"]), this.getProduct.bind(this));
        routeur.delete('/:product_id',checkUserRole(["admin", "bigBoss"]), this.deleteProduct.bind(this));
        routeur.put('/:product_id', checkUserRole(["admin", "bigBoss"]), express.json(),  this.updateProduct.bind(this));
        return routeur;
    }
}