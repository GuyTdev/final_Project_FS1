import Subscription from '../models/Subscription.js'

/**Create Subscription */
export const addMovieToSubscription = async (req, res) => {
    console.log(req.body);
    try {
        const {memberId, movieIdAndDateObj} = req.body;//movieWithDateObj:{movieId, date}
        let existSubscription = await Subscription.findOne({memberId})
        if(existSubscription?.movies.length>0){
            existSubscription.movies.push(movieIdAndDateObj)
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
/**Read get Subscription by MemberId*/

export const getSubscriptionByMemberId = async (req, res) => {
    const { member_id: memberId } = req.params;

    try {
        const subscription = await Subscription.findOne({memberId});
        if(!subscription) return res.status(404).json({message:'not found'})
        res.status(200).json(subscription)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/**Read get Movies by memberId*/

export const getMoviesArrayByMemberId = async (req, res) => {
    const { member_id:memberId } = req.params;

    try {
        const subscription = await Subscription.findOne({memberId});
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
        if(!subscription) return res.json({message:'not found'})
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
            res.status(200).json({message: `Subscription with id :${resp._id} deleted successfully`} );
        }else{
            res.send({ message:`No Subscription with id: ${id}`})
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/**Delete Subscription by MemberId */
export const deleteSubscriptionByMemberId = async (req, res) => {
    try{
        const { id: memberId } = req.params;
        const resp = await Subscription.findOneAndRemove({memberId});
        if(resp){
            res.status(200).json({message: `Subscription with memberId :${resp._id} deleted successfully`} );
        }else{
            res.send({ message:`No Subscription with memberId: ${id}`})
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
/**Delete movieId from all Subscriptions by movieId */
export const deleteMovieFromAllSubscriptions = async (req, res) => {
    try{
        const { id: movieId } = req.params;
        const subscriptions = await Subscription.find();
        console.log(subscriptions);
        if(subscriptions){
            await Promise.all(subscriptions.map(async (subscription) => {
                await Subscription.findByIdAndUpdate(subscription._id, {movies: subscription.movies.filter(movie => movie.movieId.toString()!== movieId)})
            }))
            res.status(200).json({message: `Movies with movie id ${movieId} deleted from all subscriptions successfully`} );
        }else{
            res.send({ message:`No Subscription with memberId: ${movieId}`})
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


