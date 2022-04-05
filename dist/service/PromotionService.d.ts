import { PromotionDocument, PromotionProsp } from "../model";
export declare class PromotionService {
    private static instance?;
    static getInstance(): PromotionService;
    private constructor();
    createPromotion(props: PromotionProsp): Promise<PromotionDocument>;
    getAll(): Promise<PromotionDocument[]>;
    getById(promotionId: string): Promise<PromotionDocument | null>;
    deleteById(promotionId: string): Promise<boolean>;
    updateById(promotionId: string, props: PromotionProsp): Promise<PromotionDocument | null>;
}
