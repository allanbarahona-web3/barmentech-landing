import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  getApiConfiguration,
  parsePublicWebOrigins,
} from "./config/api-configuration";
import { createApiApplication } from "./main";

test("parses valid public web origins with trimming and de-duplication", () => {
  assert.deepEqual(
    parsePublicWebOrigins(
      " https://formation.barmentech.com,https://barmentech.com,https://formation.barmentech.com ",
    ),
    ["https://formation.barmentech.com", "https://barmentech.com"],
  );
});

test("rejects public web origins that are not exact safe origins", () => {
  for (const origin of [
    "https://*.barmentech.com",
    "https://user:password@barmentech.com",
    "https://barmentech.com/contact",
    "https://barmentech.com?source=test",
    "https://barmentech.com#contact",
    "not a url",
  ]) {
    assert.throws(() => parsePublicWebOrigins(origin));
  }
});

test("requires valid public web origins in production", () => {
  assert.throws(
    () => getApiConfiguration({ NODE_ENV: "production" }),
    /PUBLIC_WEB_ORIGINS is required in production/,
  );
  assert.throws(
    () =>
      getApiConfiguration({
        NODE_ENV: "production",
        PUBLIC_WEB_ORIGINS: "https://*.barmentech.com",
      }),
    /must not contain wildcard origins/,
  );
});

test("serves the minimal health response at the versioned route", async (t) => {
  const app = await createApiApplication(
    getApiConfiguration({
      NODE_ENV: "test",
      PUBLIC_WEB_ORIGINS: "http://localhost:3000",
    }),
  );
  await app.listen(0, "127.0.0.1");
  t.after(() => app.close());

  const address = app.getHttpServer().address();
  assert.ok(address && typeof address !== "string");

  const response = await fetch(`http://127.0.0.1:${address.port}/v1/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
