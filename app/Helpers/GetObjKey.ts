export default function GetObjKey(obj: Object, key: string){
    return Object.keys(obj).find(keyObj => keyObj === key);
}