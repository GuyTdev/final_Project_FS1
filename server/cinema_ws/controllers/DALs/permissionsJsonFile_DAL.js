import jFile from 'jsonfile';
import path from 'path'
const filePath=path.join(process.cwd(),'JsonFiles','permissions.json')
export const readPermissionsJsonFile = () =>
{
    return jFile.readFile(filePath);
}
export const writeToPermissionsJsonFile = (newFileContent) =>
{
    return jFile.writeFile(filePath, newFileContent);
}