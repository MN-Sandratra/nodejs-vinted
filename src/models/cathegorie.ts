import mongoose from 'mongoose';

const cathegorieSchema=new mongoose.Schema({
    designation:String,
    sousCathegorie:[
        {
            designation:String,
            sousSousCathegorie:[{
                designation:String
            }]
        }
    ]

});

const Cathegorie=mongoose.model('cathegorie',cathegorieSchema);
module.exports=Cathegorie;
