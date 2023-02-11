
import * as subscriptionsWS_DAL from './DALs/subscriptionsWS_DAL.js'
/** /subscriptions **/

// @description Add movie to subscription in subscriptions collection
// @route GET /subscriptions
// @access Private
/**Create Subscription */
export const addMovieToSubscription = async (req, res) => {
   const movieObj = req.body;
   const {data: subscription} = await subscriptionsWS_DAL.addMovieToSubscription(movieObj)
   res.send(subscription);
}
// @description Get all subscriptions in subscriptions collection
// @route GET /subscriptions
// @access Private
/**Read get all Subscriptions */
export const getSubscriptions = async (req, res) => {
    const {data: subscriptions} = await subscriptionsWS_DAL.getSubscriptions()
    res.send(subscriptions);
}

// @description Get subscription by memberId from subscriptions collection
// @route GET /subscriptions/:member_id
// @access Private
/**Read get Subscription byMemberId*/
export const getSubscriptionByMemberId = async (req, res) => {
    const {member_id} = req.params;
   const {data: subscription} = await subscriptionsWS_DAL.getSubscriptionByMemberId(member_id)
   res.send(subscription);
}

// @description Get subscription by id from subscriptions collection
// @route GET /subscriptions/:id
// @access Private
/**Read GET Subscription byId*/
export const getSubscription = async (req, res) => {
    const {id} = req.params;
    const {data:subscription} = await subscriptionsWS_DAL.getSubscription(id);
    res.send(subscription);
}

// @description Delete a subscription by id
// @route DELETE /subscriptions/:id
// @access Private
/**Delete Subscription */
export const deleteSubscription = async (req, res) => {
    const {id} = req.params;
    const {data: deleteResp} = await subscriptionsWS_DAL.deleteSubscription(id);
    res.send(deleteResp);
}

/**     subscriptions/movies     **/
// @description Create new movie
// @route POST /movies
// @access Private
/**Create POST */
export const createMovie = async (req, res) => {
    const movieObj = req.body;
    const {data: createMovieResp} = await subscriptionsWS_DAL.createMovie(movieObj);
    res.send(createMovieResp);
}

// @description Get all movies
// @route GET /movies
// @access Private
/**Read GET */
export const getMovies = async (req, res) => {
    const {data:movies} = await subscriptionsWS_DAL.getMovies();
    res.send(movies);
}

// @description Get movie
// @route GET /movies
// @access Private
/**Read GET */
export const getMovie = async (req, res) => {
    const {id} = req.params;
    const {data:movies} = await subscriptionsWS_DAL.getMovies(id);
    res.send(movies);
}

// @description Update movie
// @route PATCH /movies
// @access Private
/**Update PATCH / PUT */
export const updateMovie = async (req, res) => {
    const movieObj = req.body;
    const {data:updateMovieResp} = await subscriptionsWS_DAL.updateMovie(movieObj);
    res.send(updateMovieResp);
}

// @desc Delete a movie
// @route DELETE /movies
// @access Private
/**Delete DELETE */
export const deleteMovie = async (req, res) => {
    const {id} = req.params;
    const {data: deleteResp} = await subscriptionsWS_DAL.deleteMember(id);
    res.send(deleteResp);
}


/**     subscriptions/members     **/
// @desc Create new member
// @route POST /members
// @access Private
/**Create POST */
export const createMember = async (req, res) => {
    const memberObj = req.body;
    const {data: createMemberResp} = await subscriptionsWS_DAL.createMember(memberObj);
    res.send(createMemberResp);
}

// @description Get all members
// @route GET /members
// @access Private
/**Read GET */
export const getMembers = async (req, res) => {
    const {data:members} = await subscriptionsWS_DAL.getMembers();
    res.send(members);
}

// @description Get member
// @route GET /members
// @access Private
/**Read GET */
export const getMember = async (req, res) => {
    const {id} = req.params;
    const {data:members} = await subscriptionsWS_DAL.getMembers(id);
    res.send(members);
}

// @description Update member
// @route PATCH /members
// @access Private
/**Update PATCH / PUT */
export const updateMember = async (req, res) => {
    const memberObj = req.body;
    const {data:updateMemberResp} = await subscriptionsWS_DAL.updateMember(memberObj);
    res.send(updateMemberResp);
}

// @desc Delete a member
// @route DELETE /members
// @access Private
/**Delete DELETE */
export const deleteMember = async (req, res) => {
    const {id} = req.params;
    const {data: deleteResp} = await subscriptionsWS_DAL.deleteMember(id);
    res.send(deleteResp);
}