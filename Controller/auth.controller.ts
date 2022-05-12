import express, {Request, Response, Router} from "express";
import {AuthService} from "../service";
import {checkUserConnected} from "../middleware";
import {verifAuth} from "../class/verifAuth";
import {isGeneratorFunction} from "util/types";

export class AuthController {
    private role: string[]= ["admin", "bigBoss", "customer", "livreur", "preparateur" ]

    async createUser(req: Request, res: Response) {
        let bearer= req.rawHeaders[1].split(" ");
        const connected = await AuthService.getInstance().getById(bearer[1]);
        if (connected?.role !== undefined){
            let result = await verifAuth.verifCreate(connected.role, req.body.role);
            if (result == 1){
                throw  new Error("user don\'t have right for create user ");
            }
        }

        if (!req.body.role || ( this.role.indexOf(req.body.role) && req.body.role !== "customer")){
            req.body.role = "customer";
        }
        if (req.body.restaurant){
            verifAuth.cordonateUser(req.body.role, req.body.restaurant, req);
        }


        try {
            let user;
            if (req.body.restaurant){
                user = await AuthService.getInstance().subscribeUser({
                    login: req.body.login,
                    password: req.body.password,
                    restaurant: req.body.restaurant,
                    role: req.body.role
                });
            }else {
                user = await AuthService.getInstance().subscribeUser({
                    login: req.body.login,
                    password: req.body.password,
                    role: req.body.role
                });
            }
            res.json(user);
        } catch(err) {
            console.log(err);
            res.status(400).end();
        }
    }

    async logUser(req: Request, res: Response) {
        const platform = req.headers['user-agent'] || "Unknown";
        try {
            const session = await AuthService.getInstance().logIn({
                login: req.body.login,
                password: req.body.password
            }, platform);
            res.json({
                token: session?._id
            });
        } catch(err) {
            console.log(err);
            res.status(401).end(); // unauthorized
        }
    }

    async me(req: Request, res: Response) {
        res.json(req.user);
    }



    buildRoutes(): Router {
        const router = express.Router();
        router.post('/subscribe',  express.json(), this.createUser.bind(this));
        router.post('/login', express.json(), this.logUser.bind(this)); 
        router.get('/me', checkUserConnected(), this.me.bind(this));
        return router;
    }
}