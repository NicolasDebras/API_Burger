import {ProductDocument, ProductModel, ProductProsp} from "../model";

export class ProductService{
    private static instance?: ProductService;

    public static getInstance(): ProductService {
        if(ProductService.instance === undefined){
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }
    private constructor() { }

    public async createProduct(props: ProductProsp): Promise<ProductDocument>{
        const model = new ProductModel(props);
        const product = await model.save();
        return product;
    }

    async getAll(): Promise<ProductDocument[]> {
        return ProductModel.find().exec();
    }

    async getById(productId: string): Promise<ProductDocument | null > {
        return ProductModel.findById(String(productId)).exec();
    }

    async deleteById(productId: string): Promise<boolean> {
        const res = await ProductModel.deleteOne({_id: productId}).exec();
        return res.deletedCount === 1;
    }

    async updateById(productId: string, props: ProductProsp): Promise<ProductDocument | null>{
       const product = await this.getById(productId);
       if (!product){
           return null;
       }
       if (props.name !== undefined ){
           product.name = props.name;
       }
       if (props.price !== undefined ){
           product.price = props.price;
       }
       if (props.promotion !== undefined){
           product.promotion = props.promotion;
       }
       const res = await product.save();
       return res;
    }
}