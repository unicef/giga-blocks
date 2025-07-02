import { BadRequestException, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './utils/exceptions/exception.filter';
import { setupSwagger } from './swagger';
import { AuthGuard } from './auth/guards/auth.global.guard';
import fmp from 'fastify-multipart';
import * as helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  await app.register(fmp);
  const reflector = app.get(Reflector);
  const port = process.env.PORT || 3000;

  app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"] } }));
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      exceptionFactory: errors => {
        // Format validation errors into a user-friendly structure
        const formattedErrors = errors.map(error => ({
          field: error.property,
          errors: Object.values(error.constraints || {}),
          children: error.children?.length
            ? error.children.map(child => ({
                field: child.property,
                errors: Object.values(child.constraints || {}),
              }))
            : undefined,
        }));

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );
  app.setGlobalPrefix('api').enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // Custom Exception Filter
  app.useGlobalFilters(new CustomExceptionFilter());
  // set Global Guard
  app.useGlobalGuards(new AuthGuard(reflector));
  // Api Docs
  setupSwagger(app);
  await app.listen(port, '0.0.0.0');
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
