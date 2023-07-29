const arabic = require("./arabic.js");
const hebrew = require("./hebrew.js");
const tibetan = require("./tibetan.js");
const russian = require("./russian.js");

const keys = {
  RUSSIA: "russian",
  ARABIC: "arabic",
  HEBREW: "hebrew",
  TIBETAN: "tibetan",
};

const languageMappings = new Map([
  [keys.RUSSIA, russian],
  [keys.ARABIC, arabic],
  [keys.HEBREW, hebrew],
  [keys.TIBETAN, tibetan],
]);

module.exports = { keys, languageMappings };
