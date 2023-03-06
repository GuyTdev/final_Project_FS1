import axios from 'axios'
const subscriptionsWsBaseUri = 'http://localhost:4000/api'
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
   return axios.get(`${subscriptionsUri}/bymember/${member_id}`);
}

export const getSubscription =  (id) => {
   return axios.get(`${subscriptionsUri}/${id}`)
}

export const deleteSubscription = (id) => {
   return axios.delete(`${subscriptionsUri}/${id}`)
}
export const deleteSubscriptionByMemberId = (id) => {
   return axios.delete(`${subscriptionsUri}/member/${id}`)
}
export const deleteMovieFromAllSubscriptions = (id) => {
   return axios.delete(`${subscriptionsUri}/movie/${id}`)
}

/** /movies **/
export const createMovie =  (movieObj) => {
   return axios.post(`${moviesUri}`, movieObj);
}

export const getMovies = () => {
   return axios.get(`${moviesUri}`)
}

export const getMovie =  (id) => {
   return axios.get(`${moviesUri}/${id}`);
}

export const updateMovie =  (id, movieObj) => {
   return axios.patch(`${moviesUri}/${id}`, movieObj)
}

export const deleteMovie = (id) => {
   return axios.delete(`${moviesUri}/${id}`)

}

/** members **/

export const createMember =  (memberObj) => {
   return axios.post(`${membersUri}`, memberObj);
}

export const getMembers = () => {
   return axios.get(`${membersUri}`)
}

export const getMember =  (id) => {
   return axios.get(`${membersUri}/${id}`);
}

export const updateMember =  (id, memberObj) => {
   return axios.patch(`${membersUri}/${id}`, memberObj)
}

export const deleteMember = (id) => {
   return axios.delete(`${membersUri}/${id}`)
}

