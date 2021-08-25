const {UserInputError}= require ('apollo-server')
const Cathegorie = require('../../models/cathegorie')

module.exports ={
    Query:{
        getAllCathegories: async ()=>{
            try{
                const cathegories=await Cathegorie.find();
                return cathegories
            }catch(err){
                throw new Error(err);
            }
        },
        getCathegorieById:async (_parent,{id},_context,_info)=>{
            try{
                return await Cathegorie.findById(id);
            }catch(err){
                throw new Error(err);
            }   
        }
    },

    Mutation:{
        createCathegorie:async(parent,args,context,info)=>{
            const{designation,sousCathegorie}=args.cathegorie;

            //verify that username doesn't exist
            const cathegorie=await Cathegorie.findOne({designation})
            if(cathegorie){
                throw new UserInputError('Cette cathegorie existe deja',{
                    error:{
                        username:"ce nom de cathegorie est deja utiise"
                    }
                });
            }
            const newCathegorie=new Cathegorie({
                designation,
                sousCathegorie
            })
            try{
                await newCathegorie.save();
                return newCathegorie;
            }catch(err){
                throw new Error(err);
            } 
        },
        createSousCathegorie:async(parent,args,context,info)=>{
            const {cathegorieId}=args;
            const{designation,sousSousCathegorie}=args.sousCathegorie;

            if(designation.trim()===''){
                throw new UserInputError('la designation ne peut etre vide ',{
                    errors:{
                        body:'la designation ne doit pas etre vide'
                    }
                });
            }
            const sousCathegorie=await Cathegorie.findById(cathegorieId);

            if(sousCathegorie){
                sousCathegorie.sousCathegorie.unshift({
                    designation,
                    sousSousCathegorie
                });
                await sousCathegorie.save();
                return sousCathegorie;
            }else throw new UserInputError("On n'as pas encore cette cathegorie");
            
        },
        deleteSousCathegorie:async(parent,args,context,info)=>{
            const {cathegorieId}=args;
            const {sousCathegorieId}=args.sousCathegorieId;
            const sousCathegorie=await Cathegorie.findById(cathegorieId);

            if(sousCathegorie){
                const sousCathegorieIndex=Cathegorie.sousCathegorie.findIndex(c=>c.id===sousCathegorieId);
                sousCathegorie.sousCathegorie.splice(sousCathegorieIndex,1);
                await sousCathegorie.save();
                return sousCathegorie;
            }else throw new UserInputError("On n'as pas encore cette cathegorie");  
        },

        deleteCathegorie:async(parent,args,context,info)=>{
            const {id}=args;
            await Cathegorie.findByIdAndDelete(id);
            return 'Cathegorie, Delete';
            
        },
        updateCathegorie:async(parent,args,context,info)=>{
            const {id}=args;
            const {designation,sousCathegorie}=args.cathegorie;

            const cathegorie=await Cathegorie.findOneAndUpdate(
                id,
                {designation,sousCathegorie},
                {new:true},
            )
            return cathegorie;
        },

        updateSousCathegorie:async(parent,args,context,info)=>{
            const {cathegorieId}=args;
            const {sousCathegorieId}=args.sousCathegorieId;
            const{designation,sousSousCathegorie}=args.sousCathegorie;
            const sousCathegorie=await Cathegorie.findById(cathegorieId);

            if(sousCathegorie){
                const sousCathegorieIndex=Cathegorie.sousCathegorie.findIndex(c=>c.id===sousCathegorieId);

                sousCathegorie.sousCathegorie[sousCathegorieIndex].designation=designation;
                sousCathegorie.sousCathegorie[sousCathegorieIndex].sousSousCathegorie=sousSousCathegorie;
                await sousCathegorie.save();
                return sousCathegorie;
            }else throw new UserInputError("On n'as pas encore cette cathegorie"); 

        }
    }
}