#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/apiService.js'
import { printHelp, printSuccess, printError, printWeather } from './services/logService.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storageService.js'

async function saveToken(token) {
  if(!token.length) {
    printError(`Не передан токен`)
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранен успешно!')
  } catch(error) {
    printError(`При сохранении токена произошла ошибка: ${error}`)
  }
}

async function getForcast() {
  const defaultCity = await getKeyValue(TOKEN_DICTIONARY.city)
  const cityValue = process.env.CITY || defaultCity || 'moscow'
  const weather = await getWeather(cityValue)
  if(weather) {
    printWeather(weather)
  }
}

async function saveCity(city) {
  if(!city.length) {
    printError(`Не передан город`)
    return
  }
  try {
    const prevCity = await getKeyValue(TOKEN_DICTIONARY.city)
    
    if(city !== prevCity) {
      await saveKeyValue(TOKEN_DICTIONARY.city, city)
      printSuccess(`Город сохранен успешно! Теперь, если не передаете параметр -s, будет браться сохраненный город - ${city}. При передаче другого города в параметр -s старое значение по умолчанию перезапишется`)
    }
  } catch(error) {
    printError(`При сохранении города произошла ошибка: ${error}`)
  }
}

async function initCLI() {
  const args = getArgs(process.argv)

  if(args.s) {
    const data = await getWeather(args.s)

    if(data) {
      saveCity(args.s)
      printWeather(data)
    }
    return
  }
  if(args.h === true) {
    printHelp()
    return
  }
  if(args.t) {
    return saveToken(args.t)
  }

  getForcast()
}

initCLI()
