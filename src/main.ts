import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as session from 'express-session'
import { join } from 'path'
import { ValidationPipe } from '@nestjs/common'; 

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
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  hbs.registerPartials(join(__dirname, '..','views','partials'))
  await app.listen(3000)
}
bootstrap();
