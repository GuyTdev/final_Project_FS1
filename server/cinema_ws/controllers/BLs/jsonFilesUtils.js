//TODO: move this file to BL folder inside package.json files path
import * as permissionsJsonFile_DAL from '../DALs/permissionsJsonFile_DAL.js';
import * as usersJsonFile_DAL from '../DALs/usersJsonFile_DAL.js';
export const insertNewUserPermissions = async (newUserPermissionsObj)=>{
    //read old data from permissions.json
    let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
    //Modify old file content to a new file contents (with new user's permissions object) to be ready for insertion and overwrite:
    let newPermissionsJsonFileContent = addNewUserToJsonPermissionsFileContentObj(permissionsJsonFileContent, newUserPermissionsObj)
    //Write new data to permissions.json
    await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
}
export const insertNewUserData = async (newUserDataObj)=>{
    //read old data from users.json
    let usersJsonFileContent = await usersJsonFile_DAL.readUsersJsonFile();
    //Modify old file content to a new file contents (with new user's Data Object) to be ready for insertion and overwrite both files:
    let newUsersJsonFileContent = addNewUserDataInJsonUsersFileContentObj(usersJsonFileContent, newUserDataObj)
    //Write new data to users.json
    await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
}
export const updateUserPermissions = async (newUserPermissionsObj)=>{
    //read old data from permissions.json
    let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
    //Modify old file content to a new file contents (with new user's permissions object) to be ready for insertion and overwrite:
    let newPermissionsJsonFileContent = modifyPermissionsArrayInJsonObj(permissionsJsonFileContent, newUserPermissionsObj)
    //Write new data to permissions.json
    await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
}
export const updateUserData = async (newUserDataObj)=>{
    //read old data from users.json
    let usersJsonFileContent = await usersJsonFile_DAL.readUsersJsonFile();
    //Modify old file content to a new file contents (with new user's Data Object) to be ready for insertion and overwrite both files:
    let newUsersJsonFileContent = modifyUserDataInJsonObj(usersJsonFileContent, newUserDataObj)
    //Write new data to users.json
    await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
}
export const deleteUserPermissionsFromJsonFile = async (_id)=>{
    //read old data from permissions.json
    let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
    //Modify old file content to a new file contents (with deleting a user's permissions object) to be ready for insertion and overwrite:
    let newPermissionsJsonFileContent = deleteUserPermissionsObjInJsonObj(permissionsJsonFileContent, _id)
    //Write new data to permissions.json
    await permissionsJsonFile_DAL.writeToPermissionsJsonFile(newPermissionsJsonFileContent);
}
export const deleteUserFromUsersDataJsonFile = async (_id)=>{
    //read old data from users.json
    let usersJsonFileContent = await usersJsonFile_DAL.readUsersJsonFile();
    //Modify old file content to a new file contents (with deleting a user's Data Object) to be ready for insertion and overwrite both files:
    let newUsersJsonFileContent = deleteUserDataObjInJsonObj(usersJsonFileContent, _id)
    //Write new data to users.json
    await usersJsonFile_DAL.writeToUsersJsonFile(newUsersJsonFileContent);
}
export const getUserPermissionsById = async(id)=>{
    //read old data from permissions.json
    let {permissions: usersPermissionsArray} = await permissionsJsonFile_DAL.readPermissionsJsonFile();
    const {permissions: userPermissions} =  usersPermissionsArray.find(perObj => perObj._id === id);
    return userPermissions;
}

export const getUserDataById= async(id)=>{
    //read old data from users.json
    let usersDataObjFileContent = await usersJsonFile_DAL.readUsersJsonFile();
    const foundUserObj = usersDataObjFileContent.users.find(userObj => userObj._id === id);
    return foundUserObj;
}

//helper functions with json files content:--------------------------------------------------------------------------------------
/**
 * @description get a file content, modify data of specific user ==> return the new file content
 * @param {oldJsonfileContent} oldPermissionsJsonObj
 * @param {userPermissionsObjectToModifyInFileContent} newUserPermissionsObj
 * @returns newJsonFileContent
 */
const modifyPermissionsArrayInJsonObj = (oldPermissionsJsonObj, newUserPermissionsObj) =>{
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
const modifyUserDataInJsonObj = (oldUsersJsonObj, newUserDataObj) =>{
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
const deleteUserPermissionsObjInJsonObj = (oldPermissionsJsonObj, _id) =>{
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
const deleteUserDataObjInJsonObj = (oldUsersDataJsonObjFileContent, _id) =>{
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
const addNewUserDataInJsonUsersFileContentObj = (oldUsersJsonObj, newUserDataInputObj) =>{
    let createdDate = new Date().toISOString()
    let newUserDataObj = {...newUserDataInputObj, createdDate}
    console.log("newUserDataObj=>",newUserDataObj);
    oldUsersJsonObj.users.push(newUserDataObj)
    return oldUsersJsonObj;
}
/**
 * @description get a file content, push new user data to the file content ==> return the new file content
 * @param {oldJsonfileContent} oldUsersJsonObj
 * @param {userDataObjectToInsertToFileContent} newUserDataInputObj
 * @returns newJsonFileContent
 */
const addNewUserToJsonPermissionsFileContentObj = (oldPermissionsJsonObj, newUserPermissionsInputObj) =>{
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
