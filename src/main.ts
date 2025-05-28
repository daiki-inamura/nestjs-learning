import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as session from 'express-session'
import { join } from 'path'
const hbs = require('hbs')

async function bootstrap() {
  const app = await NestFactory
    .create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  
  app.setViewEngine('hbs')
  app.use(session({
    secret: 'sample-secret-key',
    resave: false,
    saveUninitialized: false,
  }))
  hbs.registerPartials(join(__dirname, '..','views','partials'))
  await app.listen(3000)
}
bootstrap();
