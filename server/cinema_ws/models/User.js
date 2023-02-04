import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},
{ versionKey: false }
)

var User = mongoose.model('user', userSchema);

export default User;