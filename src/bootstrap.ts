/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';

export function bootstrapEnvironmentVariables() {
  let path = '.env';
  if (process.env.NODE_ENV === 'test') {
    path = '.env.test';
  }
  const { parsed } = dotenv.config({ path });
  for (const key in parsed) process.env[key] = parsed[key];
  console.log(`Initializing in ${process.env.NODE_ENV ?? 'development'} mode`);
}
