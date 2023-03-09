import * as CryptoJS from 'crypto-js';

function encrypt(data: string, key: string): string {
  const encryptedData = CryptoJS.AES.encrypt(data, key);

  // Return the encrypted data as a base64-encoded string
  return encryptedData.toString();
}
const code = encrypt(
  '0xA39632B1621c8De98Dc097720D154bE36C254DEA',
  process.env.CRYPTO_PRIVATE_KEY || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
);
console.log(code);
