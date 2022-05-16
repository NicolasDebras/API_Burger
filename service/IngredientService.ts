import { IngredientModel, IngredientProps, IngredientDocument } from "../model/ingredientModel";
import {CommandeModel, CommandeProsp, UserDocument, UserModel} from "../model";

export class IngredientService {

    private static instance?: IngredientService

    public static getInstance() : IngredientService {
        if (IngredientService.instance === undefined) {
            IngredientService.instance = new IngredientService();
        }
        return IngredientService.instance;
    }

    private constructor() {

    }

    public async createIngredient(props: IngredientProps): Promise<IngredientDocument>{
        const model = new IngredientModel(props);
        const Ingredient = await model.save();
        return Ingredient;
    }

    async getAll(): Promise<IngredientDocument[]> {
        return IngredientModel.find().exec();
    }

    public async getById(idIngredient: string) {
        return IngredientModel.findById(idIngredient).exec();
    }

    async deleteById(IngredientId: string): Promise<boolean>{
        const res = await IngredientModel.deleteOne({_id: IngredientId}).exec();
        return res.deletedCount === 1;
    }

    async verifIngredientProduct(IngredientId: string, RestaurantId: string): Promise<IngredientDocument| null >{
        let ingredient  = await IngredientModel.findOne({ ingredient: IngredientId, restaurant: RestaurantId}).exec();
        return ingredient;
    }

    async IngredientRestaurant(IngredientId: string, RestaurantId: string): Promise<IngredientDocument| null >{
        let ingredient  = await IngredientModel.findOne({ ingredient: IngredientId, restaurant: RestaurantId}).exec();
        return ingredient;
    }

    async updateById(IngredientId: string, props: IngredientProps): Promise<IngredientDocument | null> {
        const Ingredient = await this.getById(IngredientId);
        if(!Ingredient){
            return null;
        }
        if(props.name !== undefined){
            Ingredient.name = props.name;
        }
        if (props.quantity !== undefined){
            Ingredient.promotion = props.quantity;
        }
        const res = await Ingredient.save();
        return res;
    }

    async UpdateQuantity(quantity: number, IngredientId: string): Promise< boolean> {
        const filter = { _id: IngredientId};
        const update = { quantity: quantity };
        let doc = await IngredientModel.findOneAndUpdate(filter, update);
        if (doc){
            return true;
        }
        return false;
    }
}