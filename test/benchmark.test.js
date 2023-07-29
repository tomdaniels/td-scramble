const { performance } = require("perf_hooks");

const { encrypt, decrypt } = require("../index.js");
const { keys } = require("../mappings/index.js");

function benchmark(func, message, key) {
  const start = performance.now();
  func(message, key);
  const end = performance.now();
  return end - start;
}

const message = "can YOU uncover the mEsSage";
describe("Encryption and Decryption Tests", () => {
  Object.values(keys).forEach((key) => {
    const encryptedMessage = encrypt(message, key);
    test(`Encryption with key ${key}`, () => {
      expect(encryptedMessage).not.toBe(message);
    });

    test(`Decryption with key ${key}`, () => {
      const decryptedMessage = decrypt(encryptedMessage, key);
      expect(decryptedMessage).toEqual(message);
    });

    test(`encryption benchmark: ${benchmark(
      encrypt,
      message,
      key
    )} milliseconds`, () => {
      expect(true).toBe(true);
    });
    test(`decryption benchmark: ${benchmark(
      decrypt,
      message,
      key
    )} milliseconds`, () => {
      expect(true).toBe(true);
    });
  });
});
