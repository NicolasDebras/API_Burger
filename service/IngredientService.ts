import { IngredientModel, IngredientProps, IngredientDocument } from "../model/ingredientModel";

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

    async updateById(IngredientId: string, props: IngredientProps): Promise<IngredientDocument | null> {
        const Ingredient = await this.getById(IngredientId);
        if(!Ingredient){
            return null;
        }
        /*if(props.name !== undefined){
            Ingredient.name = props.name;
        }
        if (props.price !== undefined){
            Ingredient.price = props.price;
        }*/
        if (props.quantity !== undefined){
            Ingredient.promotion = props.quantity;
        }
        const res = await Ingredient.save();
        return res;
    }
}