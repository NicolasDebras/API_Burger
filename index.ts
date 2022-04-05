import {config} from "dotenv";
config();
import express from 'express';
import mongoose from "mongoose";
import {Mongoose} from "mongoose";
import { RestaurantController } from "./Controller/RestaurantController";
import { RestaurantModel } from "./model/RestaurantModel";



async function start_serveur(): Promise<void>{

    const m : Mongoose = await mongoose.connect(process.env.MONGO_URL as string, {
        auth : {
            username : process.env.MONDO_USER,
            password : process.env.MONDO_PASSWORD
        }
    });


    const app = express();

    const restaurantController = new RestaurantController();
    app.use('/rest', restaurantController.buildRoutes());

    app.listen(process.env.PORT, function(){
        console.log("Server " + process.env.PORT)
    })

}

start_serveur().catch(console.error);