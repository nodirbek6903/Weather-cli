import getArgs from "./helpers/args.js"
import { getIcon, getWeather } from "./services/api.service.js"
import { printError,printSuccess,printHelp, printWeather } from "./services/log.services.js"
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from "./services/storage.services.js"


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

const saveCity =async city => {
    if(!city.length){
        printError("City doesn't exist")
        return
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess("City was saved")
    }
    catch(error){
        printError(error.msg)
    }
}

const getForcast = async () => {
   try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
    const response = await getWeather(city)
   printWeather(response, getIcon(response.weather[0].icon))
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
    if(args.h){
      return  printHelp()
        //help
    }
    if(args.s){
        //save city
      return  saveCity(args.s)
    }
    if(args.t){
        //save token
       return saveToken(args.t)
    }
    //result
  return  getForcast()
}

startCLI()