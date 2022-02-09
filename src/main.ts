import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);




  const options = new DocumentBuilder()
    .setTitle('Iakta Challenge')
    .setDescription('This is a test')
    .setVersion('1.0')
    .addTag('iakta')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(config.get('APP_PORT'), '0.0.0.0', () =>
    console.log(
      `service ${config.get(
        'npm_package_name',
      )} is listening on port ${config.get(
        'APP_PORT',
      )} with prefix path '/${config.get(
        'APP_PREFIX',
      )} in the environment ${config.get('NODE_ENV')} `,
      'AppStart',
    ),
  );
}
bootstrap();
