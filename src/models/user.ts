import {Schema,model} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    location:String,
    password: {
        type:String,
        required:true,
    },
    createdAt:{
        type:String
    }
}
)

const User=model('User',userSchema);

module.exports=User;