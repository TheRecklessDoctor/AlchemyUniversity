const ethereum_crypt = require("ethereum-cryptography/secp256k1-compat.js");
const {toHex} = require("ethereum-cryptography/utils.js")
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { keccak256 } = require("ethereum-cryptography/keccak");

let privateKey = ethereum_crypt.createPrivateKeySync();
let privateKeyHex = toHex(privateKey);

let publicKey = secp256k1.getPublicKey(privateKey);
let publicKeyHex = toHex(publicKey);

let address = keccak256(publicKey.slice(1)).slice(-20);
let addressHex = toHex(address);

console.log(`private key: ${privateKeyHex}`);
console.log(`public key: ${publicKeyHex}`);
console.log(`address: ${addressHex}`);



