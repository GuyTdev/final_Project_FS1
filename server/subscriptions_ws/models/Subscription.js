import mongoose, { Schema, model } from 'mongoose';

const subscriptionsSchema = new Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    movies : [
        {
        movieId : {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Movie'
        },
        date : {
            type: String,
            required:true
        }}
    ],

},
{
    timestamps: true,
    versionKey: false
}
)

export default model('Subscription',subscriptionsSchema);