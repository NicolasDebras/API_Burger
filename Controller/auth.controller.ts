import express, {Request, Response, Router} from "express";
import {AuthService} from "../service";
import {checkUserConnected} from "../middleware";
import { isConstructorDeclaration } from "typescript";

export class AuthController {

    async createUser(req: Request, res: Response) {
        try {
            const user = await AuthService.getInstance().subscribeUser({
                login: req.body.login,
                password: req.body.password
            });
            res.json(user);
        } catch(err) {
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
            console.log(res);
            res.status(401).end(); // unauthorized
        }
    }

    async me(req: Request, res: Response) {
        res.json(req.user);
    }

    buildRoutes(): Router {
        const router = express.Router();
        router.post('/subscribe', express.json(), this.createUser.bind(this)); // permet de forcer le this lors de l'appel de la fonction sayHello
        router.post('/login', express.json(), this.logUser.bind(this)); // permet de forcer le this lors de l'appel de la fonction sayHello
        router.get('/me', checkUserConnected(), this.me.bind(this));
        return router;
    }
}