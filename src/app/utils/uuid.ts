/**
 * Generate a random UUID
 */
export function uuid() {
  return crypto.randomUUID();
}

/**
 * NULL UUID
 */
export const NULL_UUID = '00000000-0000-0000-0000-000000000000';
