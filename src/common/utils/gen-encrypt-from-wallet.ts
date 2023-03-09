import * as CryptoJS from 'crypto-js';

function encrypt(data: string, key: string): string {
  const encryptedData = CryptoJS.AES.encrypt(data, key);

  // Return the encrypted data as a base64-encoded string
  return encryptedData.toString();
}
const code = encrypt(
  '0xae92f3b47da60a57dea94970f5a8168405d31275',
  process.env.CRYPTO_PRIVATE_KEY || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
);
console.log(code);
