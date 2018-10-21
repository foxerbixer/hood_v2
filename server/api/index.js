
export default function () {
  return {
    users: require('./users').default(...arguments),
    profile: require('./profile').default(...arguments),
    post: require('./posts').default(...arguments)
  }
}


