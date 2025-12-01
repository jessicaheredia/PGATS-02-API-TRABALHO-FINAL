export const BASE_PASSWORD = '123456';

export function randomEmail(prefix = 'test') {
  return `${prefix}_${Date.now()}@test.com`;
}
