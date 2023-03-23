import jFile from 'jsonfile'
import path from 'path'
const filePath=path.join(process.cwd(),'JsonFiles','users.json')
// const filePath=`../../JsonFiles/users.json`
export const readUsersJsonFile = () =>
{
    console.log("filePath to users.json: =>" , filePath);
    return jFile.readFile(filePath);
}
export const writeToUsersJsonFile = async (newFileContent) =>
{
    await jFile.writeFile(filePath, newFileContent);
    return 'successfully write to file'
}