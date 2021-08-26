import mongoose from 'mongoose';
const color =require('../const/color.const');


const articleSchema= new mongoose.Schema({
    titre:String,
    description:String,
    marque:String,
    etat:{
        type:mongoose.Schema.Types.ObjectId,
        refs:'etats'
    },
    prix:Number,
    ISBN:String,
    taille:String,
    echange:String,
    matiere:String,
    unisexe:{
        type:String,
    },
    color:[{
        color:String,
    }],
    image:[
        {
            path:String,
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    createdAt:String,
});

const Article=mongoose.model('article',articleSchema);

module.exports=Article;