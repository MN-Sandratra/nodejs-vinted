const Message=require('../../models/message')
const ObjectId=require('bson')

module.exports={
    Query:{
        getAllMessages:async()=>{
            try{
                const messages=await Message.find()
                return messages
            }catch(err){
                throw new Error(err)
            }
        },
        getAllMyMessages:async (_parent,{sender},_context,_info)=>{
            try{
                var o_id= new ObjectId.ObjectID(sender)
                const messages=await Message.find({sender:"610920610807ec0f88e93d58"});
                return messages
            }catch(err){
                throw new Error(err);
            }
        },
        getMyMessageAndOther:async (_parent,{sender,receiver},_context,_info)=>{
            try{
                const messages=await Message.find({sender:sender,receiver:receiver}|| {sender:receiver,receiver:sender});
                return messages;
            }catch(err){
                throw new Error(err);
            }
        },
        getMyMessageByArticle:async(parent,args,context,info)=>{
            const {sender,article}=args;
            try{
                const messages=await Message.find({article:article,sender:sender}||{article:article,receiver:sender});
                return messages;
            }catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation:{
        createMessage:async(_parent,args,_context,_info)=>{
            const {sender,receiver,article,message}=args.message
            if(sender===receiver){
                throw new UserInputError('sender would be different of receiver',{
                    error:{
                        username:"l'envoyeur et le receveur doit etre different"
                    }
                });
            }
            var Sender=new ObjectId.ObjectID(sender);
            var Receiver=new ObjectId.ObjectID(receiver);
            var Article=new ObjectId.ObjectID(article);
            
            const newMessage=new Message({
                sender:Sender,
                receiver:Receiver,
                Article,
                message,
                createdAt:new Date().toISOString()
            })
            await newMessage.save();
            return newMessage;
        },
        deleteMessage:async(parent,args,context,info)=>{
            const {id}=args;
            await Message.findByIdAndDelete(id);
            return 'Message Delete';
        }
    }
}