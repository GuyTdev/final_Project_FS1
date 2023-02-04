import express from 'express';
import mongoose from 'mongoose';
import Subscription from '../models/Subscription.js'

const router = express.Router();
/**Create Subscription */
export const addMovieToSubscription = async (req, res) => {
    console.log(req.body);
    try {
        const {memberId, movieIdAndDateObj} = req.body;//movieWithDateObj:{movieId, date}
        console.log("memberId",memberId);
        let existSubscription = await Subscription.findOne({memberId})
        console.log("existSubscription: ", existSubscription);
        if(existSubscription?.movies.length>0){
            existSubscription.movies.push(movieIdAndDateObj)
            console.log("existSubscription after push: ", existSubscription);
            const resp = await Subscription.findByIdAndUpdate(existSubscription._id, existSubscription) 
            if(resp){
                res.status(201).json({message:`movie added to ${existSubscription._id}`});
            }else{
                res.status(500).json(resp);
            }
        }else{
            //if memberId doesn't have subscription
            // let memberObjId = mongoose.Types.ObjectId(memberId)
            const moviesArray = [movieIdAndDateObj]
            const subscriptionObj = {memberId, movies: moviesArray}
            console.log("subscriptionObj: ", subscriptionObj);
            const newSubscription = new Subscription(subscriptionObj);
            const resp = await newSubscription.save() 

            res.status(201).json(resp );
    }


    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/**Read get all Subscriptions */
export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
/**Read get Subscription byMemberId*/

export const getSubscriptionbyMemberId = async (req, res) => {
    const { memberId } = req.params;

    try {
        const subscription = await Subscription.find({memberId});
        res.status(200).json(subscription)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/**Read get Subscription byId*/

export const getSubscriptionMovies = async (req, res) => {
    const { id } = req.params;

    try {
        const subscription = await Subscription.findById(id);
        res.status(200).json(subscription?.movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
/**Read get Subscription byId*/

export const getSubscription = async (req, res) => {
    const { id } = req.params;

    try {
        const subscription = await Subscription.findById(id);
        if(!subscription) return res.status(404).json({message:'not found'})
        res.status(200).json(subscription);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


/**Delete Subscription */
export const deleteSubscription = async (req, res) => {
    try{
        const { id } = req.params;
        const resp = await Subscription.findByIdAndRemove(id);
        if(resp){
            res.status(202).json({message: `Subscription with id :${resp._id} deleted successfully`} );
        }else{
            res.status(404).send({ message:`No Subscription with id: ${id}`})
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export default router;