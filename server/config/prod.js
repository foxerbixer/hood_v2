module.exports = {
  name: 'HOOD',
  port: process.env.PORT,
  db: {
    url: 'mongodb://isAdmin:admin123@ds129541.mlab.com:29541/hood_v1',
  },
  secretOrKey:  'ANY_SECRET',
  cloudinary: {
    name: 'dfevin4e9',
    key: '593874533584892',
    secret: 'HCkxhC4W0GCShkNzD6uBhnhjiJI'
  }
}
