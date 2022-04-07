import {config} from "dotenv";
config();
import express from "express";
import mongoose, {Mongoose} from "mongoose";
import { RestaurantController } from "./Controller/RestaurantController";
import { RestaurantModel } from "./model/RestaurantModel";
import {CommandeController, ProductController} from "./Controller";
import {PromotionController} from "./Controller/PromotionController";
import {MenuController} from "./Controller/MenuController";
async function startServer(): Promise<void> {
    const m : Mongoose = await mongoose.connect(process.env.MONGO_URI as string, {
        auth: {
            username: process.env.MONGO_USER as string,
            password: process.env.MONGO_PASSWORD as string

        }
    });
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

    app.listen(process.env.PORT, function (){
        console.log("Server listening on port " + process.env.PORT);
    });
}

startServer().catch(console.error);

