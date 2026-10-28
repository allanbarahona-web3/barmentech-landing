import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import {
  type ApiConfiguration,
  getApiConfiguration,
} from "./config/api-configuration";
import { PublicExceptionFilter } from "./http/public-exception.filter";

export async function createApiApplication(
  configuration: ApiConfiguration,
) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("v1");
  app.set("trust proxy", configuration.trustProxy);
  app.use((_: unknown, response: { setHeader(name: string, value: string): void }, next: () => void) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "DENY");
    next();
  });
  app.useBodyParser("json", { limit: "16kb" });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new PublicExceptionFilter());
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
