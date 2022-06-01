/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';

export function bootstrapEnvironmentVariables() {
  console.log(`Initializing in ${process.env.NODE_ENV ?? 'development'} mode`);

  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const isTest = process.env.NODE_ENV === 'test';
  const path = isTest ? '.env.test' : '.env';

  const { parsed } = dotenv.config({ path });
  for (const key in parsed) process.env[key] = parsed[key];
}
