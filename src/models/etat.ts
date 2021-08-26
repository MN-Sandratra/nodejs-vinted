import mongoose from'mongoose';

const etatSchema=new mongoose.Schema({
    designation:{
        type:String,
        required:true
    },
    description:String,
});

const Etat=mongoose.model('etat',etatSchema);
export default Etat;
