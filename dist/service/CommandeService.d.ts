import { CommandeDocument, CommandeProsp } from "../model";
export declare class CommandeService {
    private static instance?;
    static getInstance(): CommandeService;
    private constructor();
    createCommande(props: CommandeProsp): Promise<CommandeDocument>;
    priceCommande(props: CommandeProsp): Promise<number>;
    getAll(): Promise<CommandeDocument[]>;
    getById(idCommande: string): Promise<any>;
    deleteById(commandeId: string): Promise<boolean>;
    updateById(commandeId: string, props: CommandeProsp): Promise<CommandeDocument | null>;
}
