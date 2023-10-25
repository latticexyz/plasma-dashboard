import { isHex } from "viem";
import { z, ZodError } from "zod";

// We need to manually define these using the full `process.env.*` because Next.js' build step replaces these strings with their actual values from the env.
const envInput = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
  BATCHER_INBOX: process.env.BATCHER_INBOX,
  BATCHER: process.env.BATCHER,
};

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_RPC_URL: z.string().url(),
  BATCHER_INBOX: z.string().refine(isHex),
  BATCHER: z.string().refine(isHex),
});

export function parseEnv(): z.infer<typeof envSchema> {
  try {
    return envSchema.parse(envInput);
  } catch (error) {
    if (error instanceof ZodError) {
      const { _errors, ...invalidEnvVars } = error.format();
      console.error(
        `\nMissing or invalid environment variables:\n\n  ${Object.keys(
          invalidEnvVars
        ).join("\n  ")}\n`
      );
    }
    throw error;
  }
}

export const env = parseEnv();
