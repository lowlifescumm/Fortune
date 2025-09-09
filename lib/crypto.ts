import * as crypto from 'crypto';

/**
 * Creates an HMAC-SHA256 signature.
 * @param payload The stringified JSON payload.
 * @param secret The secret key for HMAC.
 * @returns The hexadecimal representation of the signature.
 */
export function createHmacSignature(payload: string, secret: string): string {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}
