//@flow
export const arrayToSentence = (
  words: Array<string>,
  lang: string = 'en'
): string => {
  const connector = lang === 'en' ? ', and ' : ', '
  return words
    .reduce((prev, curr, i) => {
      return prev + curr + (i === words.length - 2 ? connector : ', ')
    }, '')
    .slice(0, -2)
}
