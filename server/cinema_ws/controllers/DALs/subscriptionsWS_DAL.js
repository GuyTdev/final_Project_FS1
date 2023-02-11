import axios from 'axios'
const subscriptionsWsBaseUri = 'http://localhost:4000/api/'
const subscriptionsUri = `${subscriptionsWsBaseUri}/subscriptions`
const membersUri = `${subscriptionsWsBaseUri}/members`
const moviesUri = `${subscriptionsWsBaseUri}/movies`

/**subscriptions */
export const addMovieToSubscription =  (movieObj) => {
   return axios.post(`${subscriptionsUri}`, movieObj);
}

export const getSubscriptions = () => {
   return axios.get(`${subscriptionsUri}`)
}

export const getSubscriptionByMemberId =  (member_id) => {
   return axios.get(`${subscriptionsUri}/${member_id}`);
}

export const getSubscription =  (id) => {
   return axios.get(`${subscriptionsUri}/${id}`)
}

export const deleteSubscription = (id) => {
   return axios.delete(`${subscriptionsUri}/${id}`)
}

/** /movies **/
export const createMovie =  (movieObj) => {
   return axios.post(`${moviesUri}`, movieObj);
}

export const getMovies = () => {
   return axios.get(`${moviesUri}`)
}

export const getMovie =  () => {
   return axios.get(`${moviesUri}/${id}`);
}

export const updateMovie =  () => {
   return axios.patch(`${moviesUri}/${id}`)
}

export const deleteMovie = () => {
   return axios.delete(`${moviesUri}`)
}

/** members **/

export const createMember =  (memberObj) => {
   return axios.post(`${membersUri}`, memberObj);
}

export const getMembers = () => {
   return axios.get(`${membersUri}`)
}

export const getMember =  () => {
   return axios.get(`${membersUri}/${id}`);
}

export const updateMember =  () => {
   return axios.patch(`${membersUri}/${id}`)
}

export const deleteMember = () => {
   return axios.delete(`${membersUri}`)
}

