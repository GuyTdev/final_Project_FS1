import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    name : {type: String, required: true},
    genres : [{type: String, required: true}],
    image : {type: String, required: true},//url of picture
    premiered : {type: String, required: true},
    createdDate : Date
},
{
    timestamps:true,
    versionKey:false
})

export default model('Movie',movieSchema);