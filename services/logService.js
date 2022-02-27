import chalk from 'chalk'
import dedent from 'dedent-js'

function printError(error) {
  console.log(`${chalk.bgRed(' ERROR: ')} ${error}`)
}

function printSuccess(message) {
  console.log(`${chalk.bgGreen(' SUCCESS: ')} ${message}`)
}

function printHelp() {
  console.log(dedent
    `
    ${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `
  )
}

function printWeather(response) {
  console.log(dedent
    `
    ${chalk.yellow('WEATHER')} Погода в городе ${response.name}
    Описание: ${response.weather[0].description}
    Температура: ${response.main.temp} (ощущается как ${response.main.feels_like})
    Влажность: ${response.main.humidity}%
    Скорость ветра: ${response.wind.speed}
    `
  )
}

export { printError, printSuccess, printHelp, printWeather }
