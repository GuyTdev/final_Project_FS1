// import JFile  from 'jsonfile'
// const file = './JsonFiles/permissions.json'
// const file2 = './JsonFiles/users.json'
// let oldPermissionsJsonObj= {};
// const res = await JFile.readFile(file)
// //   .then(obj => {return obj})
// //   .catch(error => console.error(error))
//   console.log("res=>", res);
// let oldUsersJsonObj= {};
// oldUsersJsonObj = await JFile.readFile(file2)
// console.log("oldUsersJsonObj", oldUsersJsonObj);
//helpers functions---------------------------------------------------------------------------------------
export const modifyPermissionsArrayInJsonObj = (oldPermissionsJsonObj, newUserPermissionsObj) =>{
    const {userId, permissions: newPermissionsArray} = newUserPermissionsObj;
    const newPermissionsJsonObj = {"permissions": oldPermissionsJsonObj.permissions
                .map(perObj => 
                    perObj.userId === userId
                    ? {...perObj, permissions:newPermissionsArray}
                    : perObj)}
    
    return newPermissionsJsonObj;
}

export const modifyUserDataInJsonObj = (oldUsersJsonObj, newUsersDataObj) =>{
    const {_id} = newUserDataObj;
    const newUserDataObj = {...newUsersDataObj ,_id : newUsersDataObj.userId }
    const newUsersJsonObj = {"users": oldUsersJsonObj.users
                .map(userObj => 
                    userObj._id === _id
                    ? newUserDataObj
                    : userObj)}

                    return newUsersJsonObj;
}
export const addNewUserDataInJsonUsersFileContentObj = (oldUsersJsonObj, newUserDataObj) =>{
    let createdDate = new Date().toISOString()
    newUserDataObj = {...newUserDataObj, createdDate}
    oldUsersJsonObj.users.push(newUserDataObj)
    return oldUsersJsonObj;
}
//helpers functions end------------------------------------------------------------------------------------

// const newUserPermissionsObj =
// {
//     userId: '61939bb816e4a6c0aeb009d4', permissions: ["some modified permission 1","some modified permission 2"]
// }
// if(res){

//     const newFileContent = modifyPermissionsArrayInJsonObj(res, newUserPermissionsObj)
//     console.log("newFileContent=>", newFileContent);
//     console.log("newFileContent.permissions=>", newFileContent.permissions);
// }


// import * as permissionsJsonFile_DAL from './controllers/DALs/permissionsJsonFile_DAL.js'
//   let permissionsJsonFileContent = await permissionsJsonFile_DAL.readPermissionsJsonFile();
//   console.log("permissionsJsonFileContent:", permissionsJsonFileContent);
import * as usersJsonFile_DAL from './controllers/DALs/usersJsonFile_DAL.js'
  let usersJsonFileContent = await usersJsonFile_DAL.readUsersJsonFile();
  console.log("usersJsonFileContent:", usersJsonFileContent);

  let newUserObj =     {
    _id: '61939bf316e4a6c0aeb009d7',
    firstName: 'Ori',
    lastName: 'Anavim',
    sessionTimeout: '3'
  }

  const newFileContent = addNewUserDataInJsonUsersFileContentObj(usersJsonFileContent, newUserObj)
  console.log(newFileContent);

  const resp2 = await usersJsonFile_DAL.writeToUsersJsonFile(newFileContent);
  console.log("resp2", resp2);