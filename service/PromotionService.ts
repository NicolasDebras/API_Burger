import {PromotionDocument, PromotionModel, PromotionProsp} from "../model";

export class PromotionService {

    private static instance?: PromotionService;

    public static getInstance(): PromotionService{
        if(PromotionService.instance === undefined){
            PromotionService.instance = new PromotionService();
        }
        return PromotionService.instance;
    }
    private constructor() { }

    public async createPromotion(props: PromotionProsp): Promise<PromotionDocument>{
        const model = new PromotionModel(props);
        const promotion = await model.save();
        return promotion;
    }

    async getAll(): Promise<PromotionDocument[]> {
        return PromotionModel.find().exec();
    }

    async getById(promotionId: string): Promise<PromotionDocument | null > {
        return PromotionModel.findById(promotionId).exec();
    }

    async deleteById(promotionId: string): Promise<boolean> {
        const res = await PromotionModel.deleteOne({_id: promotionId}).exec();
        return res.deletedCount === 1;
    }

    async updateById(promotionId: string, props: PromotionProsp): Promise<PromotionDocument | null>{
        const promotion = await this.getById(promotionId);
        if (!promotion){
            return null;
        }
        if (props.name !== undefined ){
            promotion.name = props.name;
        }
        if (props.percentage !== undefined ){
            promotion.percentage = props.percentage;
        }

        const res = await promotion.save();
        return res;
    }
}