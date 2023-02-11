import User from '../models/User.js'
import bcrypt from 'bcrypt'

import * as permissionsJsonFile_DAL from './DALs/permissionsJsonFile_DAL.js'
import * as usersJsonFile_DAL from './DALs/usersJsonFile_DAL.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateUser = async (req, res) => {
    try {
        const {_id} = req.params;
        const { firstName,lastName, username, sessionTimeout, permissions} = req.body;
        userPermissionsObject ={_id, permissions}
        userDataObject ={_id, firstName,lastName, sessionTimeout}
        //update username in usersDB users collection
        await User.findByIdAndUpdate(_id,{username})
        //read old data from permissions.json and users.json
        let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
        let usersJsonFileContent = await usersJsonFile_DAL.readPermissionsJsonFile();

        //Modify old file content to a new file contents (with new user objects) to be ready for insertion and overwrite both files:
        let newPermissionsJsonFileContent = modifyPermissionsArrayInJsonObj(permissionsJsonFileContent, userPermissionsObject)
        let newUsersJsonFileContent = modifyUserDataInJsonObj(usersJsonFileContent, userDataObject)

        //Write new data to permissions.json and users.json
        await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
        await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
        return res.status(201).json(`user with id ${_id} updated`)
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
        await newUserCredentials.save();
        //get the new User _id mongoDB has generated
        const _id= newUserCredentials._id 

        //get permissionsObj = {_id, permissionsArray} from userObj
        const newUserPermissionsObj = {_id, permissions: userObj.permissions}
        //get usersDataObj = {_id, firstName, lastName, createdDate, sessionsTimeout(in minutes)} from userObj
        const newUserDataObj = {_id: newUserCredentials._id, firstName: userObj.firstName, lastName: userObj.lastName, sessionsTimeout: userObj.sessionsTimeout}
        //get user credentials from userObj

        //read old data from permissions.json and users.json
        let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
        let usersJsonFileContent = await usersJsonFile_DAL.readUsersJsonFile();

        //Modify old file content to a new file contents (with new user objects) to be ready for insertion and overwrite both files:
        let newPermissionsJsonFileContent = addNewUserToJsonPermissionsFileContentObj(permissionsJsonFileContent, newUserPermissionsObj)
        let newUsersJsonFileContent = addNewUserDataInJsonUsersFileContentObj(usersJsonFileContent, newUserDataObj)

        //Write new data to permissions.json and users.json
        await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
        await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
        
        res.status(201).json(`user with id ${_id} has been created !`)

    }catch(error){
        console.log(error);
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
        const _id = req.params;
        //delete user from users collection in usersDB using User mongoose model
        await User.findByIdAndDelete(_id);

        //read old data from permissions.json and users.json
        let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
        let usersJsonFileContent = await usersJsonFile_DAL.readPermissionsJsonFile();

        //Modify old files contents to new files contents (with deleted user objects) to be ready for insertion and overwrite both files:
        let newPermissionsJsonFileContent = deleteUserToJsonPermissionsFileContentObj(permissionsJsonFileContent, newUserPermissionsObj)
        let newUsersJsonFileContent = deleteUserDataInJsonUsersFileContentObj(usersJsonFileContent, newUserDataObj)

        //Write new data to permissions.json and users.json
        await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
        await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
        
        res.status(201).json(`user with id ${_id} has been deleted !`)

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
                    perObj.userId === _id
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
    updatedUserJsonFileContentObj = {"users": oldUsersJsonObj.users
                .map(userObj =>
                    userObj._id === _id
                    ? newUserDataObj
                    : userObj)}

    return updatedUserJsonFileContentObj;
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
                "View Subscriptions",
                "Create Subscriptions",
                "Delete Subscriptions",
                "Update Subscriptions",
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


