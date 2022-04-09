import {RequestHandler, Response, Request} from "express";
import {AuthService} from "../service";
import {UserProps} from "../model";


declare module 'express' {
    export interface Request {
        user?: UserProps
    }
}

export function checkUserRole(roles : string[] = []): RequestHandler {

    return async function (req: Request, res: Response, next) {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {

            res.status(401).end();
            return;
        }
        const parts = authorization.split(" ");
        const token = parts[1];
        try {
            const user = await AuthService.getInstance().getUserFrom(token);
            const userRole : string = user?.role!;
            if (user === null) {
                res.status(401).end();
                return;
            }
            if(roles.length && !roles.includes(userRole)){
                res.status(401).end();
                return;
            }
            next();
        }
        catch{
            res.status(401).end();
            return;
        }
    }
}
