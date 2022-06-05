const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

// Print the keys to the console
console.log();
console.log('Public key: \n', publicKey);

console.log();
console.log('Private key\n', privateKey);