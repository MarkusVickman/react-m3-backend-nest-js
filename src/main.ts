import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//Bootstrap betyder där programmet startar. Vid start startar AppModule och den lyssnar på port 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //gör cors tillgängligt
  app.enableCors();

  //ValidationPipe sköter felhantering och felmeddelande enligt Dto och controllers
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
