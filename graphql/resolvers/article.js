const Article= require('../../models/article')
const {UserInputError}=require('apollo-server')
module.exports ={
    Query:{
        getAllArticles: async ()=>{
            const article=await Article.find()
            return article
        },
        getArticleById:async (_parent,{id},_context,_info)=>{
            return await Article.findById(id);
        }
    },

    Mutation:{
        createArticle:async(parent,args,context,info)=>{
            const{titre,description,marque,etat,prix,ISBN,echange,matiere,image,color}=args.article;
            
            if(image.length>20){
                throw new UserInputError("Nombre d'Image superieur a 20",{
                    error:{
                        username:"chaque article ne peut posseder plus de 20 images"
                    }
                });
            }
            if(color.length>20){
                throw new UserInputError("Nombre de couleur superieur a 2",{
                    error:{
                        username:"chaque article ne peut posseder plus de 2 couleurs"
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
                color,
                echange,
                matiere,
                image,
                createdAt:new Date().toISOString()
            })
            await newArticle.save();
            return newArticle;
        },

        updateArticle:async(parent,args,context,info)=>{
            const {id}=args;
            const{titre,description,marque,etat,prix,ISBN,echange,matiere,image,color}=args.article;
            
            if(image.length>20){
                throw new UserInputError("Nombre d'Image superieur a 20",{
                    error:{
                        username:"chaque article ne peut posseder plus de 20 images"
                    }
                });
            }
            if(color.length>20){
                throw new UserInputError("Nombre de couleur superieur a 2",{
                    error:{
                        username:"chaque article ne peut posseder plus de 2 couleurs"
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
                color,
                echange,
                matiere,
                image},
                {new:true}
            )
            return newArticle;
        },


        deleteArticle:async(parent,args,context,info)=>{
            const {id}=args;
            await Article.findByIdAndDelete(id);
            return 'Article, Delete';
            
        }
    }
}