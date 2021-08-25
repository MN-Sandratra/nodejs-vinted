const User= require('../../models/user')
const {UserInputError}= require ('apollo-server')

module.exports ={
    Query:{
        getAllUsers: async ()=>{
            try{
                const users=await User.find()
                return users
            }catch(err){
                throw new Error(err)
            }    
        },
        getUserById:async (_parent,{id},_context,_info)=>{
            try{
                return await User.findById(id);
            }catch(err){
                throw new Error(err)
            }
        }
    },

    Mutation:{
        createUser:async(parent,args,context,info)=>{
            const{username,email,password}=args.user;

            //verify that username doesn't exist
            const user=await User.findOne({username})
            if(user){
                throw new UserInputError('Username is Taken',{
                    error:{
                        username:"ce nom d'utiisateur est deja utiise"
                    }
                });
            }
            
            const newUser=new User({
                username,
                email,
                password,
                createdAt:new Date().toISOString()
            })
            await newUser.save();
            return newUser
        },

        deleteUser:async(parent,args,context,info)=>{
            const {id}=args;
            await User.findByIdAndDelete(id);
            return 'User, Delete';
            
        }
    }
}