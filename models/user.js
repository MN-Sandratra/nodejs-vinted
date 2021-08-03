const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    createdAt:{
        type:String
    }
}
)

const User=mongoose.model('user',userSchema);

module.exports=User;