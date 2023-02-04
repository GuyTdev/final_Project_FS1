import Member from '../models/Member.js'
import * as memberWS_DAL from './membersWS_DAL.js'

export const getSpecificPropsFromWSAndInsetIntoDBCollection = async (req, res) =>{
    try{
        let membersArrayFromDB = await Member.find();
        let members = membersArrayFromDB;
        if(membersArrayFromDB.length === 0){
            let {data: fetchedMembers} = await memberWS_DAL.getAllMembers();
            members = fetchedMembers.map(member =>{
                const {name, email, address:{city}} = member;
                let  relevantMemberDetails = {name, email, city: city}
                return relevantMemberDetails
            })
            Member.insertMany(members, (err, docs) =>{
                if(err) return console.error(err)
                console.log("multiple documents of type Member have been inserted to Movies Collection inside subscriptionDB");
                return `multiple documents of type Member have been inserted to Movies Collection inside subscriptionDB`;
            })
        }else{
            console.log(`there Is already ${membersArrayFromDB.length} Members In DB` );
            return `there Is already ${membersArrayFromDB.length} Members In DB`
        }
    }catch(err){
        // res.send(err);
        console.log(err);
    }
}