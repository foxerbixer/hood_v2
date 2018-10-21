import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'


  export default () => ([
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser(),
    cors()
  ])