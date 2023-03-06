import User from '../models/User.js'
import bcrypt from 'bcrypt'

import * as permissionsJsonFile_DAL from './DALs/permissionsJsonFile_DAL.js'
import * as usersJsonFile_DAL from './DALs/usersJsonFile_DAL.js'
import * as jsonFilesUtils from './BLs/jsonFilesUtils.js'


export const getUsers = async (req, res) => {
    try {
        let users = await User.find();
        if(users?.length > 0) {
            let allDetailsUsersArray = await jsonFilesUtils.buildUserFullDataObjArray(users);
            return res.json(allDetailsUsersArray);
        }
        res.json('no users found');
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        console.log("user grabbed=>",user);
        if(user){
            let userDataObject =await jsonFilesUtils.getUserDataById(id);
            let userPermissionsArray =await jsonFilesUtils.getUserPermissionsById(id)
            const userDetailsObj ={...userDataObject, username: user.username, permissions: userPermissionsArray}
            return res.json(userDetailsObj);
        }
        res.json(`user with id ${id} does not exist`)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const { firstName,lastName, username, sessionTimeout, permissions} = req.body;
        const userPermissionsObject ={_id: id, permissions}
        let userDataObject =await jsonFilesUtils.getUserDataById(id);
        userDataObject ={...userDataObject, firstName:firstName,lastName:lastName, sessionTimeout:sessionTimeout}
        //update username in usersDB users collection
        const updateUserResp = await User.findByIdAndUpdate(id,{username},{new:true})
        console.log("updateUserResp: ",updateUserResp)
        console.log("userDataObject: ",userDataObject)
;
        if(updateUserResp){
            //update permissions json file
            await jsonFilesUtils.updateUserPermissions(userPermissionsObject);
            //update users json file
            await jsonFilesUtils.updateUserData(userDataObject);
            return res.json(`user with id ${id} updated`)
        }
        res.json(`user with id ${id} does not exist`)

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/**Create new User by admin:
 * 1. create new UserModel to mongoDB {username ,password} -->generate an auto _id which move on to the next phase
 * 2. create new user permissions object {_id, permissionsArray} in the permissions Json file
 * 3. create new user userData object {_id, firstName, lastName, createdDate, sessionTimeout} in the users Json file
 * 4. if all action goes successfully returns 'Done!'
 */
export const createUser = async (req, res) =>
{
    try{
        const userObj = req.body;
        //add new user credentials(username and password) to users collection in usersDB using User mongoose model
        const newUserCredentials = new User({
            username: userObj.username,
            password: "initialPassword"
        })
        const created = await newUserCredentials.save();
        console.log("created=>",created);
        //get the new User _id mongoDB has generated
        const _id= newUserCredentials._id
        if(_id){
            //get permissionsObj = {_id, permissionsArray} from userObj
            const newUserPermissionsObj = {_id, permissions: userObj.permissions}
            //get usersDataObj = {_id, firstName, lastName, createdDate, sessionsTimeout(in minutes)} from userObj
            const newUserDataObj = {_id: newUserCredentials._id, firstName: userObj.firstName, lastName: userObj.lastName, sessionTimeout: userObj.sessionTimeout}
            //get user credentials from userObj

            //add new user permissionsObj to permissionsJsonFile
            await jsonFilesUtils.insertNewUserPermissions(newUserPermissionsObj);
            //add new user userDataObj to usersJsonFile
            await jsonFilesUtils.insertNewUserData(newUserDataObj);

            return res.status(201).json(`user with id ${_id} has been created !`)
        }
        res.status(409).json(`user with id ${_id} already exists`)

    }catch(error){
        res.status(409).json(error.message);

    }

}

/**delete new User by admin:
 * 1. delete UserModel to mongoDB {username ,password} -->generate an auto _id which move on to the next phase
 * 2. delete user permissions object {_id, permissionsArray} in the permissions Json file
 * 3. delete user userData object {_id, firstName, lastName, createdDate, sessionTimeout} in the users Json file
 * 4. if all action goes successfully returns 'Done!'
 */
export const deleteUser = async (req, res) =>
{
    try{
        const {id} = req.params;
        //delete user from users collection in usersDB using User mongoose model
        const deleteUserResp = await User.findByIdAndDelete(id);
        console.log("deleteUserResp:",deleteUserResp);
        if(deleteUserResp){
            //delete user from permissionsJsonFile
            await jsonFilesUtils.deleteUserPermissionsFromJsonFile(id);
            //delete user from usersJsonFile
            await jsonFilesUtils.deleteUserFromUsersDataJsonFile(id);
            return res.status(201).json(`user with id ${id} has been deleted !`)
        }
        res.status(404).json(`user with id ${id} not exist !`)

    }catch(error){
        console.log(error);
    }

}


//helper functions with json files content:--------------------------------------------------------------------------------------
/**
 * @description get a file content, modify data of specific user ==> return the new file content
 * @param {oldJsonfileContent} oldPermissionsJsonObj 
 * @param {userPermissionsObjectToModifyInFileContent} newUserPermissionsObj 
 * @returns newJsonFileContent
 */
export const modifyPermissionsArrayInJsonObj = (oldPermissionsJsonObj, newUserPermissionsObj) =>{
    const {_id, permissions: newPermissionsArray} = newUserPermissionsObj;
    const newPermissionsJsonObj = {"permissions": oldPermissionsJsonObj.permissions
                .map(perObj =>
                    perObj._id === _id
                    ? {...perObj, permissions:newPermissionsArray}
                    : perObj)}

    return newPermissionsJsonObj;
}
/**
 * @description get a file content, modify data of specific user ==> return the new file content
 * @param {oldJsonfileContent} oldUsersJsonObj
 * @param {userDataObjectToModifyInFileContent} newUserDataObj
 * @returns newJsonFileContent
 */
export const modifyUserDataInJsonObj = (oldUsersJsonObj, newUserDataObj) =>{
    const {_id} = newUserDataObj;
    const updatedUserDataObj = {...newUserDataObj ,_id : newUserDataObj._id }
    const updatedUserJsonFileContentObj = {"users": oldUsersJsonObj.users
                .map(userObj =>
                    userObj._id === _id
                    ? newUserDataObj
                    : userObj)}

    return updatedUserJsonFileContentObj;
}
/**
 * @description get a file content, delete data of specific user ==> return the new file content
 * @param {oldJsonfileContent} oldPermissionsJsonObj 
 * @param {_id} ObjectId  
 * @returns newJsonFileContent
 */
export const deleteUserPermissionsObjInJsonObj = (oldPermissionsJsonObj, _id) =>{
    const index = oldPermissionsJsonObj.permissions.findIndex(perObj => perObj._id === _id)
    if(index!== -1){
        oldPermissionsJsonObj.permissions.splice(index, 1)
    }

    return oldPermissionsJsonObj;
}
/**
* @description get a file content, delete data of specific user ==> return the new file content
* @param {oldJsonfileContent} oldPermissionsJsonObj 
* @param {_id} ObjectId  
* @returns newJsonFileContent
*/
export const deleteUserDataObjInJsonObj = (oldUsersDataJsonObjFileContent, _id) =>{
   const index = oldUsersDataJsonObjFileContent.users.findIndex(userObj => userObj._id === _id)
   if(index!== -1){
    oldUsersDataJsonObjFileContent.users.splice(index, 1)
   }

   return oldUsersDataJsonObjFileContent;
}
/**
 * @description get a file content, push new user data to the file content ==> return the new file content
 * @param {oldJsonfileContent} oldUsersJsonObj
 * @param {userDataObjectToInsertToFileContent} newUserDataInputObj 
 * @returns newJsonFileContent
 */
export const addNewUserDataInJsonUsersFileContentObj = (oldUsersJsonObj, newUserDataInputObj) =>{
    let createdDate = new Date().toISOString()
    let newUserDataObj = {...newUserDataInputObj, createdDate}
    oldUsersJsonObj.users.push(newUserDataObj)
    return oldUsersJsonObj;
}
/**
 * @description get a file content, push new user data to the file content ==> return the new file content
 * @param {oldJsonfileContent} oldUsersJsonObj
 * @param {userDataObjectToInsertToFileContent} newUserDataInputObj
 * @returns newJsonFileContent
 */
export const addNewUserToJsonPermissionsFileContentObj = (oldPermissionsJsonObj, newUserPermissionsInputObj) =>{
    oldPermissionsJsonObj.permissions.push(newUserPermissionsInputObj)
    return oldPermissionsJsonObj;
}

export const createAdmin = async(req, res) =>{
        try {
            const {username, password} = req.body
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
        //create admin in db with username and encrypted password
        const user = await User.create({username, password: passwordHash})
        console.log("admin doc in users collection: ", user);
        //create admin entry in permissions json file with the _id mongoDB has generated
        const adminPermissionsObj =         {
            "_id":user._id,
            "permissions":[
                "View Subscriptions",
                "Create Subscriptions",
                "Delete Subscriptions",
                "Update Subscriptions",
                "View Movies",
                "Create Movies",
                "Delete Movies",
                "Update Movies",
                "View Users",
                "Create Users",
                "Delete Users",
                "Update Users"
            ]
        }
        const adminUserDataObj = {
            "_id": user._id,
            "firstName":"Admin firstName",
            "lastName":"Admin lastName",
            "sessionTimeout":"1080",
        }
        //read old data from permissions.json and users.json
        let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
        let usersJsonFileContent = await usersJsonFile_DAL.readUsersJsonFile();
        console.log("usersJsonFileContent",usersJsonFileContent);
        console.log("adminUserDataObj",adminUserDataObj);

        //Modify old files contents to new files contents to be ready for insertion and overwrite both files:
        let newPermissionsJsonFileContent = addNewUserToJsonPermissionsFileContentObj(permissionsJsonFileContent, adminPermissionsObj)
        let newUsersJsonFileContent = addNewUserDataInJsonUsersFileContentObj(usersJsonFileContent, adminUserDataObj)

        //Write new data to permissions.json and users.json
        await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
        await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
        return res.status(201).json({message: 'admin has been created'})
        } catch (error) {
        res.status(500).json({error: error.message})
        }
}
//helper functions END:--------------------------------------------------------------------------------------


