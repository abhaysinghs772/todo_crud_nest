import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  app.use(bodyParser.json({ limit: '1024mb' }));
  app.use(bodyParser.urlencoded({ limit: '1024mb', extended: true }));
  app.use(morgan('dev'));

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Api is listening on port: ${process.env.PORT || 3000}`)
  });
}
bootstrap();
