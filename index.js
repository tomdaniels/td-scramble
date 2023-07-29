const { languageMappings } = require("./mappings/index.js");

const getLanguageMap = (key) => {
  const languageMap = languageMappings.get(key);
  if (!languageMap) {
    throw new Error(`Invalid encryption key: ${key}`);
  }
  return languageMap;
};

const translateChar = (char, map, isEncryption) => {
  const translatedChar = isEncryption
    ? map[char]
    : Object.keys(map).find((k) => map[k] === char);

  return translatedChar || char;
};

let lookupObject = new Map();

const encrypt = (message, key) => {
  const languageMap = getLanguageMap(key);
  let encryptedMessage = "";
  let messageLookup = {};

  for (let i = 0; i < message.length; i++) {
    let char = message[i];
    let encryptedChar = translateChar(char, languageMap, true);

    // Include the position in the key
    let keyWithPosition = encryptedChar + i;

    messageLookup[keyWithPosition] = char;
    encryptedMessage += encryptedChar;
  }

  lookupObject.set(key, messageLookup);

  return encryptedMessage;
};

const decrypt = (encryptedMessage, key) => {
  const messageLookup = lookupObject.get(key);
  let decryptedMessage = "";

  for (let i = 0; i < encryptedMessage.length; i++) {
    let char = encryptedMessage[i];

    // Include the position in the key
    let keyWithPosition = char + i;

    let originalChar = messageLookup[keyWithPosition];
    decryptedMessage += originalChar || char;
  }

  return decryptedMessage;
};

module.exports = { encrypt, decrypt };
