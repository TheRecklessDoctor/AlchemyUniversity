const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

// const { keccak256 } = require("ethereum-cryptography/keccak.js");
// const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils.js");
// const {sign, recoverPublicKey} = require("ethereum-cryptography/secp256k1.js");

// const {signMessage, verifySender} = require("cryptographyModule");
let cryptoModule;
(async () => {
  cryptoModule = await import('../cryptographyModule/index.js');
  // console.log(cryptoModule.someFunction());
})();

app.use(cors());
app.use(express.json());

const balances = {
  "432a0564ec8f986d2715e2531b6e68ebdb851297": 100,
  "fe7527909954b177adf8973274f396b1b4a488c4": 50,
  "3471956cb29dc0a1fce1f2e87b650249ded505aa": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, seed_phrase, private_key, public_key } = req.body;
  console.log(seed_phrase);
  console.log(private_key);
  console.log(public_key);
  let signature = cryptoModule.signMessage(seed_phrase, private_key);
  let [verification, publicRec] = cryptoModule.verifySender(signature, seed_phrase, sender);

  if(!verification){
    res.status(400).send({message: "Verification failed"});
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

// function signMessage(seed_phrase, private_key){
//   let hash = keccak256(utf8ToBytes(seed_phrase));
//   return sign(hash, private_key, {recovered:true})
// }

// function verifySender(signature, recoveryBit, seed_phrase, address){
//   let hash = keccak256(utf8ToBytes(seed_phrase));
//   let publicRec = recoverPublicKey(hash, signature, recoveryBit);
//   let senderRec = keccak256(publicRec.slice(1)).slice(-20);
//   return toHex(senderRec) == toHex(address);
// }
