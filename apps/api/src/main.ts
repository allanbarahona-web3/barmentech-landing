import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configuredPort = Number(process.env.PORT);
  const port =
    Number.isInteger(configuredPort) && configuredPort > 0 && configuredPort <= 65_535
      ? configuredPort
      : 3001;

  await app.listen(port, "0.0.0.0");
}

void bootstrap();
