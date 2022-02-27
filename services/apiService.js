import axios from 'axios'
import { printError } from './logService.js'
import { getKeyValue, TOKEN_DICTIONARY } from './storageService.js'

async function getWeather(city) {
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)

  if(token === undefined) {
    printError('Не задан ключ API, задайте его через команду -t [API_KEY]')
    return
  }

  let result

  await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'ru',
      units: 'metric'
    }
  })
  .then(({ data }) => {
    result = data
  })
  .catch((error) => {
    switch (error.response.status) {
      case 404:
        printError('Неверно указан город')
        break;
      case 401:
        printError('Неверно указан токен')
        break;
    
      default:
        printError(error.message)
        break;
    } 
  })

  return result
}

export { getWeather }
