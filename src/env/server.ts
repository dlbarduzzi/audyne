import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["test", "development", "production"]),
    DATABASE_URL: z.string().url(),
  },
  onValidationError: issues => {
    console.error("❌ Invalid server environment variables ❌", issues)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  },
  runtimeEnv: {
    /* eslint-disable n/no-process-env */
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    /* eslint-enable n/no-process-env */
  },
  emptyStringAsUndefined: true,
  /* eslint-disable-next-line n/no-process-env */
  skipValidation: process.env.SKIP_ENV_VALIDATIONS === "true",
})
