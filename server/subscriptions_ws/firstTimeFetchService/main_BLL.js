import * as members_BLL from './members_BLL.js'
import * as movies_BLL from './movies_BLL.js'
export const fistFetchMembersAndMoviesFromWSIntoDB = async() =>{
    try{
        await members_BLL.getSpecificPropsFromWSAndInsetIntoDBCollection()
        await movies_BLL.getSpecificPropsFromWSAndInsetIntoDBCollection()
       return `Movies and Member WS data synced with subscriptions DB`
    }catch(err){
        throw (err)
    }
}