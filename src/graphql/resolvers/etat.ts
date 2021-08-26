import {UserInputError} from 'apollo-server'
import Etat from '../../models/etat'

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
        getEtatById:async (_parent:any,{id}:any,_context:any,_info:any)=>{
            try{
                return await Etat.findById(id);
            }catch(err){
                throw new Error(err);
            }   
        }
    },

    Mutation:{
        createEtat:async(parent:any,args:any,context:any,info:any)=>{
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
        

        deleteEtat:async(parent:any,args:any,context:any,info:any)=>{
            const {id}=args;
            await Etat.findByIdAndDelete(id);
            return 'Etat, Delete';
            
        },
        updateEtat:async(parent:any,args:any,context:any,info:any)=>{
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