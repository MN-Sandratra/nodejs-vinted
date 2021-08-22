const {UserInputError}= require ('apollo-server')
const Etat = require('../../models/etat')

module.exports ={
    Query:{
        getAllEtats: async ()=>{
            try{
                const etats=await Etat.find();
                return etats
            }catch(err){
                throw new Error(err);
            }
            
        },
        getEtatById:async (_parent,{id},_context,_info)=>{
            try{
                return await Etat.findById(id);
            }catch(err){
                throw new Error(err);
            }   
        }
    },

    Mutation:{
        createEtat:async(parent,args,context,info)=>{
            const{designation,description}=args.etat;

            //verify that username doesn't exist
            const etat=await Etat.findOne({designation})
            if(etat){
                throw new UserInputError('Username is Taken',{
                    error:{
                        username:"cet etat est deja enregistrer"
                    }
                });
            }
            
            const newEtat=new Etat({
                designation,
                description
            })
            await newEtat.save();
            return newEtat;
        },

        deleteEtat:async(parent,args,context,info)=>{
            const {id}=args;
            await Etat.findByIdAndDelete(id);
            return 'Etat, Delete';
            
        },
        updateEtat:async(parent,args,context,info)=>{
            const {id}=args;
            const {designation,description}=args.etat;

            const etat=await Etat.findOneAndUpdate(
                id,
                {designation,description},
                {new:true},
            )
            return etat;
        }
    }
}