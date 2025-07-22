import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  API_PORT: z.string().default('8080').transform(Number),
  API_DATA_PATHS: z.string().default('../data/'),
});

export const ENV = envSchema.parse(process.env);
