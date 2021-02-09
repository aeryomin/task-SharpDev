/* eslint-disable no-console */
import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport'
import './config'
import authRoutes from './routes/api/auth.routes'
import transactionsRoutes from './routes/api/transactions.routes'
// import Account from './model/Account.model'

mongooseService.connect()

// const account = new Account({
//   email: 'eryomin.aa@gmail.com',
//   username: 'lex',
//   password: 'a'
// })
// account.save()

const PORT = process.env.PORT || 8090

const server = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((item) => server.use(item))

passport.use('jwt', passportJWT.jwt)

server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/transactions', transactionsRoutes)

server.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  return console.log(`Serving at http://localhost:${PORT}`)
})
