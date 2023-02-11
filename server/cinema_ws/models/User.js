import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String
},
{ versionKey: false }
)

var User = mongoose.model('user', userSchema);

export default User;