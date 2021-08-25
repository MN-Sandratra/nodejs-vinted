const mongoose=require('mongoose');

const messageSchema=({
    sender:{
        type:mongoose.Schema.ObjectId,
        refs:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        refs:'User',
        required:true,
    },
    article:{
        type:mongoose.Schema.ObjectId,
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