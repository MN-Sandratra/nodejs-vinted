import * as mongoose from 'mongoose';

const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'User',
        required:true,
    },
    article:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'articles',
    },
    message:{
        type:String,
        required:true
    },
    createdAt:Date
})

const Message=mongoose.model('message',messageSchema);
module.exports=Message;