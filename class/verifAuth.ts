import {Restaurant} from "./Restaurant";
import {Request} from "express";

export class verifAuth {
    private role: string[]= ["admin", "bigBoss", "customer", "livreur", "preparateur" ]
    public static  async  verifCreate(roleUser: string, roleCreateUser: string ): Promise<number>{
        if (roleCreateUser==="customer"){
            return 0;
        }
        if (roleCreateUser==="bigBoss"){
            return 0;
        }
        switch (roleUser){
            case "bigBoss":
                return 0;
                break;
            case "admin":
                if (roleCreateUser == "admin"){
                    return 1;
                }else{
                    return 0;
                }
                break;
        }
        return 1;
    }

    public static async cordonateUser(role: string, idRestaurant: string, req: Request){
        if (role !== "customer" && role !== "livreur"){
            let cordonateRestaurant = await Restaurant.cordonnateRestaurant(idRestaurant, req);
            if (typeof(cordonateRestaurant) !== "number"){
                req.body.Cordlat = cordonateRestaurant[0];
                req.body.Cordlong = cordonateRestaurant[1];
            }else{
                throw new Error("The restaurant not find");
            }

        }else if(!req.body.Cordlat  || !req.body.Cordlong){
            throw new Error("The user don't have cordonate");
        }
    }
}
