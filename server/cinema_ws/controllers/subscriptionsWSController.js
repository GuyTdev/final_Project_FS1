
import * as subscriptionsWS_DAL from './DALs/subscriptionsWS_DAL.js'
/** /subscriptions **/

// @description Add movie to subscription in subscriptions collection
// @route GET /subscriptions
// @access Private
/**Create Subscription */
export const addMovieToSubscription = async (req, res) => {
   const movieObj = req.body;
    try {
        const {data: subscription} = await subscriptionsWS_DAL.addMovieToSubscription(movieObj)
        res.send(subscription);
    } catch (error) {
        res.send(error.message)}
}
// @description Get all subscriptions in subscriptions collection
// @route GET /subscriptions
// @access Private
/**Read get all Subscriptions */
export const getSubscriptions = async (req, res) => {
    try {
        
        const {data: subscriptions} = await subscriptionsWS_DAL.getSubscriptions()
        res.send(subscriptions);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Get subscription by memberId from subscriptions collection
// @route GET /subscriptions/:member_id
// @access Private
/**Read get Subscription byMemberId*/
export const getSubscriptionByMemberId = async (req, res) => {
    const {member_id} = req.params;
    try {
        
        const {data: subscription} = await subscriptionsWS_DAL.getSubscriptionByMemberId(member_id)
        res.send(subscription);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Get subscription by id from subscriptions collection
// @route GET /subscriptions/:id
// @access Private
/**Read GET Subscription byId*/
export const getSubscription = async (req, res) => {
    const {id} = req.params;
    try {
        const {data:subscription} = await subscriptionsWS_DAL.getSubscription(id);
        res.send(subscription);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Delete a subscription by id
// @route DELETE /subscriptions/:id
// @access Private
/**Delete Subscription */
export const deleteSubscription = async (req, res) => {
    const {id} = req.params;
    try {
        const {data: deleteResp} = await subscriptionsWS_DAL.deleteSubscription(id);
        res.send(deleteResp);
    } catch (error) {
        res.send(error.message)
    }
}

/**     subscriptions/movies     **/
// @description Create new movie
// @route POST /movies
// @access Private
/**Create POST */
export const createMovie = async (req, res) => {
    const movieObj = req.body;
    try {
        const {data: createMovieResp} = await subscriptionsWS_DAL.createMovie(movieObj);
        res.send(createMovieResp);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Get all movies
// @route GET /movies
// @access Private
/**Read GET */
export const getMovies = async (req, res) => {
    try {
        const {data:movies} = await subscriptionsWS_DAL.getMovies();
        res.send(movies);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Get movie
// @route GET /movies
// @access Private
/**Read GET */
export const getMovie = async (req, res) => {
    const {id} = req.params;
    try {
        const {data:movies} = await subscriptionsWS_DAL.getMovie(id);
        res.send(movies);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Update movie
// @route PATCH /movies
// @access Private
/**Update PATCH / PUT */
export const updateMovie = async (req, res) => {
    const {id} = req.params;
    const movieObj = req.body;
    try {
        const {data:updateMovieResp} = await subscriptionsWS_DAL.updateMovie(id, movieObj);
        res.send(updateMovieResp);
    } catch (error) {
        res.send(error.message)
    }
}

// @desc Delete a movie
// @route DELETE /movies
// @access Private
/**Delete DELETE */
export const deleteMovie = async (req, res) => {
    const {id} = req.params;
    try {
        const {data: deleteResp} = await subscriptionsWS_DAL.deleteMovie(id);
        res.send(deleteResp);
    } catch (error) {
        res.send(error.message)
    }
}


/**     subscriptions/members     **/
// @desc Create new member
// @route POST /members
// @access Private
/**Create POST */
export const createMember = async (req, res) => {
    const memberObj = req.body;
    try {
        const {data: createMemberResp} = await subscriptionsWS_DAL.createMember(memberObj);
        res.send(createMemberResp);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Get all members
// @route GET /members
// @access Private
/**Read GET */
export const getMembers = async (req, res) => {
    try {
        const {data: members} = await subscriptionsWS_DAL.getMembers();
        res.send(members);
    } catch (error) {
        res.send(error.message)
    }
}

// @description Get member
// @route GET /members
// @access Private
/**Read GET */
export const getMember = async (req, res) => {
    const {id} = req.params;
    try {
        const {data: getMemberResp} = await subscriptionsWS_DAL.getMember(id);
        res.send(getMemberResp);
    } catch (error) {
        res.send({message: error.message});
    }
}

// @description Update member
// @route PATCH /members
// @access Private
/**Update PATCH / PUT */
export const updateMember = async (req, res) => {
    const {id} = req.params;
    const memberObj = req.body;
    try{
        const {data:member} = await subscriptionsWS_DAL.updateMember(id, memberObj);
        return res.send(member)
    }
    catch(err){
        res.send({message: err.message});
    }
}


// @desc Delete a member
// @route DELETE /members
// @access Private
/**Delete DELETE */
export const deleteMember = async (req, res) => {
    const {id} = req.params;
    try {
        const {data: deleteResp} = await subscriptionsWS_DAL.deleteMember(id);
        res.send(deleteResp);
    } catch (error) {
        res.send(error.message)
    }
}