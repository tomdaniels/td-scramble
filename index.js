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
    ? map[char.toLowerCase()]
    : Object.keys(map).find((k) => map[k] === char.toLowerCase());

  return translatedChar
    ? char === char.toUpperCase()
      ? translatedChar.toUpperCase()
      : translatedChar
    : char;
};

const translateMessage = (message, key, isEncryption) => {
  const languageMap = getLanguageMap(key);
  return message
    .split("")
    .map((char) => translateChar(char, languageMap, isEncryption))
    .join("");
};

const encrypt = (message, key) => translateMessage(message, key, true);
const decrypt = (message, key) => translateMessage(message, key, false);

module.exports = { encrypt, decrypt };
