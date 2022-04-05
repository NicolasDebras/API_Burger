import { ProductDocument, ProductProsp } from "../model";
export declare class ProductService {
    private static instance?;
    static getInstance(): ProductService;
    private constructor();
    createProduct(props: ProductProsp): Promise<ProductDocument>;
    getAll(): Promise<ProductDocument[]>;
    getById(productId: string): Promise<ProductDocument | null>;
    deleteById(productId: string): Promise<boolean>;
    updateById(productId: string, props: ProductProsp): Promise<ProductDocument | null>;
}
