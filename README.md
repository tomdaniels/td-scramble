# td-scramble [![NPM version][npm-badge]][npm-url]

An overly simple and underwhelmingly secure encryption library for experimental/learning purposes.

The assumption is that translating the literal letters of the original english spelling will exponetially scramble the original contents of the message once in it's foreign counter part. Though incredibly easy to uncover if you know the key, for my use case of scrambling words that a user is trying to guess in a game of hangman or wordle, will do just fine.

## Usage

```javascript
import { encrypt, decrypt } from "td-scramble";

const message = "some amazingly non-secret secret";
const signingKey = "hebrew";

const encryptedMessage = encrypt(message, signingKey);
console.log(encryptedMessage); // => שומה אמאזינגלי נונ-שהכרהט שהכרהט

const decryptedMessage = decrypt(encryptedMessage, signingKey);
console.log(decryptedMessage); // => some amazingly non-secret secret
```

supported signing keys include: ['arabic', 'hebrew', 'russian', 'tibetan']

[npm-badge]: https://badge.fury.io/js/td-scramble.svg
[npm-url]: https://www.npmjs.com/package/td-scramble
