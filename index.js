import getArgs from "./helpers/args.js"
import { getWeather } from "./services/api.service.js"
import { printError,printSuccess,printHelp } from "./services/log.services.js"
import { TOKEN_DICTIONARY, saveKeyValue } from "./services/storage.services.js"


const saveToken =async token => {
    if(!token.length){
        printError("Token doesn't exist")
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess("Token was saved")
    }
    catch(error){
        printError(error.msg)
    }
}

const getForcast = async () => {
   try {
    const response = await getWeather(process.env.CITY ?? "uzbekistan")
   console.log(response);
   } catch (error) {
    if(error?.response?.status == 404){
        printError("City no found")
    }else if(error?.response?.status == 401){
        printError("Invalid Token")
    }else{
        printError(error.msg)
    }
   }
}

const startCLI = () => {
    const args = getArgs(process.argv)
    console.log(process.env);
    if(args.h){
        printHelp()
        //help
    }
    if(args.s){
        //save city
    }
    if(args.t){
        //save token
       return saveToken(args.t)
    }
    //result
    getForcast()
}

startCLI()