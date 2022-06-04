const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const keyPair = ec.genKeyPair();
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

// Print the keys to the console
console.log();
console.log('Public key: \n', publicKey);

console.log();
console.log('Private key: \n', privateKey);