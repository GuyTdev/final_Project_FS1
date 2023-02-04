import JFile  from 'jsonfile'
const file = './JsonFiles/permissions.json'
let oldPermissionsJsonObj= {};
const res = await JFile.readFile(file)
//   .then(obj => {return obj})
//   .catch(error => console.error(error))
  console.log("res=>", res);

export const modifyPermissionsArrayInJsonObj = (oldPermissionsJsonObj, newUserPermissionsObj) =>{
    const {userId, permissions: newPermissionsArray} = newUserPermissionsObj;
    const newPermissionsJsonObj = {"permissions": oldPermissionsJsonObj.permissions
                .map(perObj => 
                    perObj.userId === userId
                    ? {...perObj, permissions:newPermissionsArray}
                    : perObj)}
    
    return newPermissionsJsonObj;
}
const newUserPermissionsObj =
{
    userId: '61939bb816e4a6c0aeb009d4', permissions: ["some modified permission 1","some modified permission 2"]
}
if(res){

    const newFileContent = modifyPermissionsArrayInJsonObj(res, newUserPermissionsObj)
    console.log("newFileContent=>", newFileContent);
    console.log("newFileContent.permissions=>", newFileContent.permissions);
}