import {SessionDocument, SessionModel, UserDocument, UserModel, UserProps} from "../model";
import {SecurityUtils} from "../utils";
import {RestaurantService} from "./RestaurantService";

export class AuthService {

    private static instance?: AuthService;

    public static getInstance(): AuthService {
        if(AuthService.instance === undefined) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private constructor() { }

    public async subscribeUser(user: Partial<UserProps>): Promise<UserDocument> {
        if(!user.password) {
            throw new Error('Missing password');
        }
        if (!user.role){
            throw new Error('Missing role');
        }
        if (user.login){
            let LogInReturn = await this.getByLogin(user.login);
            console.log(LogInReturn)
            if (LogInReturn ){
                throw  new Error("The login is already taken");
            }
        }

        if (user.restaurant ){
            let restaurantFind = await RestaurantService.getInstance().getById(user.restaurant);
            if (restaurantFind === undefined ){
                throw new Error("The restaurant not find");
            }else{
                const model = new UserModel({
                    login: user.login,
                    password: SecurityUtils.sha512(user.password),
                    role: user.role,
                    restaurant: user.restaurant
                });
                return model.save();
            }
        }
        const model = new UserModel({
            login: user.login,
            password: SecurityUtils.sha512(user.password),
            role: user.role
        });
        return model.save();

    }

    // Pick selectionne des champs dans le type
    public async logIn(info: Pick<UserProps, 'login' | 'password'>, platform: string): Promise<SessionDocument | null> {
        const user = await UserModel.findOne({
            login: info.login,
            password: SecurityUtils.sha512(info.password)
        }).exec();
        if(user === null) {
            throw new Error('User not found');
        }
        // 604_800 -> 1 week in seconds
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + 604_800_000);
        const session = await SessionModel.create({
            platform,
            expiration: expirationDate,
            user: user._id
        });
        user.sessions.push(session._id); // permet de memoriser la session dans le user
        await user.save();
        return session;
    }

    public async getUserFrom(token: string): Promise<UserProps | null> {
        const session = await SessionModel.findOne({
            _id: token,
            expiration: {
                $gte: new Date()
            }
        }).populate("user").exec();
        return session ? session.user as UserProps : null;
    }

    async getById(authId: string): Promise<UserDocument | null > {
        return UserModel.findById(authId).exec();
    }

    async getByLogin(login: string | undefined): Promise<UserDocument | null>{
        return UserModel.findOne({
            login: login
        }).exec();
    }

    async  getByRestaurant(restaurandId: string | undefined): Promise<UserDocument|String|Array<String>| null >{
        let employers  = await UserModel.find({restaurant: restaurandId}).exec();
        return  employers
    }
}