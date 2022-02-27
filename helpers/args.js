function getArgs(args) {
  const result = {}
  const [execucuter, file, ...rest] = args

  rest.forEach((value, index, array) => {
    const isEndOfArray = index === array.length - 1
    const valueWithoutHyphen = value.slice(1)
    const nextValue = array[index + 1]
    const isValueStartsWithHyphen = value.startsWith('-')
    const isNextValueStartsWithHyphen = nextValue ? nextValue.startsWith('-') : false

    if(isValueStartsWithHyphen) {
      result[valueWithoutHyphen] = isEndOfArray || isNextValueStartsWithHyphen ? true : nextValue
    }
  })

  return result
}

export {getArgs}
