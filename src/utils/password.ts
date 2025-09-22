import { Buffer } from 'buffer';

/**
 * Hashes a password using SHA-256 and returns it as a base64 string
 * @param password The plain text password to hash
 * @returns A promise that resolves to the hashed password as a base64 string
 */
export async function hashPassword(password: string): Promise<string> {
  // Convert the password to a buffer
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  
  // Hash the password using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert the hash to a base64 string
  return Buffer.from(hashBuffer).toString('base64');
}

/**
 * Verifies if a password matches a hash
 * @param password The plain text password to verify
 * @param hash The hash to compare against
 * @returns A promise that resolves to true if the password matches the hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
} 