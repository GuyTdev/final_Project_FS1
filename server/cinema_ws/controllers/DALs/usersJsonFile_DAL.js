import jFile from 'jsonfile'
import path from 'path'
const filePath=`${path}../../../JsonFiles/users.json`
export const readUsersJsonFile = () =>
{
    return jFile.readFile(filePath);
}
export const writeToUsersJsonFile = async (newFileContent) =>
{
    await jFile.writeFile(filePath, newFileContent);
    return 'successfully write to file'
}