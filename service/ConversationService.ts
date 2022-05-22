import { Console } from "console";
import {ConversationDocument, ConversationModel, ConversationProps, MessageDocument, MessageModel, MessageProps} from "../model";

export class ConversationService {

    private static instance?: ConversationService;

    public static getInstance(): ConversationService{
        if(ConversationService.instance === undefined){
            ConversationService.instance = new ConversationService();
        }
        return ConversationService.instance;
    }
    private constructor() { }

    public async createConversation(props: ConversationProps): Promise<ConversationDocument>{
        const model = new ConversationModel(props);
        const conversation = await model.save();
        return conversation;
    }

    async getByUserId(userID: string): Promise<ConversationDocument[] | null > { //Retrouver les conv où participe un user
        return ConversationModel.find({$or: [{
            member_a: userID
        },
        {
            member_b: userID
        }
    ]}).exec();
    }

    async getById(convId: string): Promise<ConversationDocument | null > {
        return ConversationModel.findById(convId).exec();
    }

    async getMessageById(messageID: string): Promise<MessageDocument | null > {
        return MessageModel.findById(messageID).exec();
    }


    async deleteConversation(conversationId: string): Promise<boolean> { //Supprimer la conv
        const res = await ConversationModel.deleteOne({_id: conversationId}).exec();
        return res.deletedCount === 1;
    }

    async addMessage(conversationID: string, props: MessageProps): Promise<ConversationDocument | null>{ //=Ajouter un message 
        const conversation = await this.getById(conversationID);
        console.log(conversationID);
        if (!conversation){
            return null;
        }
        if (props.message !== undefined ){
            const model = new MessageModel(props);

            const message = await model.save();
            console.log(message);
            conversation.messages.push(model._id);
        }

        const res = await conversation.save();
        return res;
    }
}