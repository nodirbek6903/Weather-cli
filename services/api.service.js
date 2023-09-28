import axios from "axios"
import {TOKEN_DICTIONARY, getKeyValue} from "./storage.services.js"


const getIcon = (icon) => {
    switch(icon.slice(0,-1)){
        case "01":
            return "*"
        case "02":
            return ""
        case "03":
            return ""
        case "04":
            return ""
        case "09":
            return ""
        case "10":
            return ""
        case "11":
            return ""
        case "13":
            return ""
        case "50":
            return ""
    }
}

const getWeather = async city => {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    if(!token){
        throw new Error("API dosen't exist, -t [API_KEY] for saving token")
    }
    const {data} = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
        params: {
            q: city,
            appid: token,
            lang: "en",
            units: "metric"
        }
    })
    return data

    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

}

export {getWeather,getIcon}