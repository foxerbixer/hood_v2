export default function(ctx){
  return {
    Post: require('./Post').default(...arguments),
    Profile: require('./Profile').default(...arguments),
    User: require('./User').default(...arguments)
  }
}