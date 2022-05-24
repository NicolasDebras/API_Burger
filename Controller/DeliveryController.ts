import { AuthService } from "../service";
import { delivery } from "../service/delivery";
import { RestaurantService } from "../service/RestaurantService"
import express,{ Router, Request,  Response} from "express";
import { json } from "stream/consumers";


export class deliveryController {


    async DeliveryFind(req: Request, res: Response) {

        const rest = await RestaurantService.getInstance().getById(req.params.id_rest);
        if (!rest)
            return res.status(400)
        
        const AllUser =  await AuthService.getInstance().getAlldelivery();

        if (!AllUser)
            return res.status(400)

        let CordDeliveryMan : [number, number][] = []
        
        for (let i = 0; i != AllUser.length ;i++) { 
            CordDeliveryMan.fill([AllUser[i].coordStart['lat'] * (Math.PI/180) , AllUser[i].coordStart['long'] * (Math.PI/180)])
        }

        const index = delivery.calcul([rest.Cordlat * (Math.PI/180) , rest.Cordlong * (Math.PI/180)], CordDeliveryMan )

        // du coup on a le livreur le plus cours du restaurant , du coup, je sais pas trop quoi en faire 

        for (let i = 0; i != AllUser.length ;i++) { 
           if (i == index)
            return res.json(AllUser[index]) // pour l'instant je rutrun le livreur le plus proche 
        }

    }

    buildRoutes(): Router {
        
        const routeur = express.Router();
        routeur.post('/:id_rest',  express.json(), this.DeliveryFind.bind(this));

        return routeur
    
    }
}