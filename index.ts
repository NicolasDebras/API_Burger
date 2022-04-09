import {config} from "dotenv";
config();
import express from "express";
import mongoose, {Mongoose} from "mongoose";
import { RestaurantController } from "./Controller/RestaurantController";
import { RestaurantModel } from "./model/RestaurantModel";
import {CommandeController, ProductController} from "./Controller";
import {PromotionController} from "./Controller/PromotionController";
import {MenuController} from "./Controller/MenuController";
import { AuthController } from './Controller/auth.controller';
async function startServer(): Promise<void> {

    await mongoose.connect(
        `${process.env.MONGO_URI}`,
        /*{
            auth: {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PWD
            }
        }*/
    );
    const app = express();

    const productController = new ProductController();
    app.use('/product', productController.buildRoutes());

    const promotionController = new PromotionController();
    app.use('/promotion', promotionController.buildRoutes());

    const menuController = new MenuController();
    app.use('/menu', menuController.buildRoutes());

    const commandeController = new CommandeController();
    app.use('/commande', commandeController.buildRoutes());

    const restaurantController = new RestaurantController();
    app.use('/rest', restaurantController.buildRoutes());

    const authController = new AuthController();
    app.use('/auth', authController.buildRoutes());

    app.listen(process.env.PORT, function (){
        console.log("Server listening on port " + process.env.PORT);
    });
}

startServer().catch(console.error);

