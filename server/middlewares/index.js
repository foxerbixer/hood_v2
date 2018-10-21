export default function () {
  return {
    reqParser: require('./reqParser').default(...arguments),
    compress: require('./compress').default(...arguments),
    passport: require('./passport')
  }
}
