import { Schema, model } from 'mongoose';

const memberSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  createdDate: Date,
},
{
    timestamps:true,
    versionKey:false
});

export default model('Member',memberSchema);