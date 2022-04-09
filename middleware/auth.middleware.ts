import {RequestHandler, Response, Request} from "express";
import {AuthService} from "../service";
import {UserProps} from "../model";


declare module 'express' {
    export interface Request {
        user?: UserProps
    }
}

export function checkUserConnected(): RequestHandler {

    return async function (req: Request, res: Response, next) {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            res.status(401).end();
            return;
        }
        const parts = authorization.split(" ");
        if (parts.length !== 2) {
            res.status(401).end();
            return;
        }
        if (parts[0] !== 'Bearer') {
            res.status(401).end();
            return;
        }
        const token = parts[1];
        try {
            const user = await AuthService.getInstance().getUserFrom(token);
            if (user === null) {
                res.status(401).end();
            }
            req.user = user as UserProps;
            next();
        }
        catch {
            res.status(401).end();
            return;
        }
    }
}
