import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import {
  type ApiConfiguration,
  getApiConfiguration,
} from "./config/api-configuration";

export async function createApiApplication(
  configuration: ApiConfiguration,
) {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: configuration.publicWebOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
    credentials: false,
  });
  app.enableShutdownHooks();

  return app;
}

async function bootstrap(): Promise<void> {
  const configuration = getApiConfiguration();
  const app = await createApiApplication(configuration);

  await app.listen(configuration.port, "0.0.0.0");
}

if (require.main === module) {
  void bootstrap();
}
