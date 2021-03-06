const Article= require('../../models/article')
import {UserInputError} from 'apollo-server'
module.exports ={
    Query:{
        getAllArticles: async ()=>{
            const article=await Article.find()
            return article
        },
        getArticleById:async (_parent:any,{id}:any,_context:any,_info:any)=>{
            return await Article.findById(id);
        }
    },

    Mutation:{
        createArticle:async(parent:any,args:any,context:any,info:any)=>{
            const{titre,description,marque,etat,prix,ISBN,echange,matiere,image}=args.article;
            
            if(image.length>20){
                throw new UserInputError("Nombre d'Image superieur a 20",{
                    error:{
                        username:"chaque article ne peut posseder plus de 20 images"
                    }
                });
            }
            const newArticle=new Article({
                titre,
                description,
                marque,
                etat,
                prix,
                ISBN,
                echange,
                matiere,
                image,
                createdAt:new Date().toISOString()
            })
            await newArticle.save();
            return newArticle;
        },

        updateArticle:async(parent:any,args:any,context:any,info:any)=>{
            const {id}=args;
            const{titre,description,marque,etat,prix,ISBN,echange,matiere,image}=args.article;
            
            if(image.length>20){
                throw new UserInputError("Nombre d'Image superieur a 20",{
                    error:{
                        username:"chaque article ne peut posseder plus de 20 images"
                    }
                });
            }

            const newArticle=await Article.findOneAndUpdate(
                id,
                {titre,
                description,
                marque,
                etat,
                prix,
                ISBN,
                echange,
                matiere,
                image},
                {new:true}
            )
            return newArticle;
        },


        deleteArticle:async(parent:any,args:any,context:any,info:any)=>{
            const {id}=args;
            await Article.findByIdAndDelete(id);
            return 'Article, Delete';
            
        }
    }
}