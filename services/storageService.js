import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')
const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
}

async function saveKeyValue(key, value) {
  let data = {}

  const tempData = await getFileData(filePath)
  data = tempData ? tempData : data

  data[key] = value

  await promises.writeFile(filePath, JSON.stringify(data))
}

async function getKeyValue(key) {
  const data = await getFileData(filePath)

  if(data) {
    return data[key]
  }
}

async function getFileData(path) {
  if(await isExist(path)) {
    const file = await promises.readFile(path)
    return JSON.parse(file)
  } 
  
  return undefined
}

async function isExist(path) {
  try {
    await promises.stat(path)
    return true
  } catch {
    return false
  }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
