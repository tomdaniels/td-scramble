const { languageMappings } = require("./mappings/index.js");

const getLanguageMap = (key) => {
  const languageMap = languageMappings.get(key);
  if (!languageMap) {
    throw new Error(`Invalid encryption key: ${key}`);
  }
  return languageMap;
};

const translateChar = (char, map, isEncryption) => {
  const translatedChar = isEncryption ? map[char] : getKeyByValue(map, char);
  return translatedChar || char;
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

let lookupObject = new Map();

const encrypt = (message, key) => {
  const languageMap = getLanguageMap(key);
  let messageLookup = {};

  const processedMessage = [...message].reduce((result, char, i) => {
    const processedChar = translateChar(char, languageMap, true);
    messageLookup[processedChar + i] = char;
    return result + processedChar;
  }, "");

  lookupObject.set(key, messageLookup);
  return processedMessage;
};

const decrypt = (encryptedMessage, key) => {
  const messageLookup = lookupObject.get(key);

  return [...encryptedMessage]
    .map((char, i) => messageLookup[char + i] || char)
    .join("");
};

module.exports = { encrypt, decrypt };
