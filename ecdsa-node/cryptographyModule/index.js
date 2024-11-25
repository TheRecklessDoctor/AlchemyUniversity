import {keccak256} from "ethereum-cryptography/keccak.js";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils.js";
import { secp256k1 } from '@noble/curves/secp256k1'; //document


/*
* signMessage takes the seed phrase and the private key and returns the hashed
* version of the seed phrase.
*/
export function signMessage(seed_phrase, private_key){
    let hash = keccak256(utf8ToBytes(seed_phrase));
    return secp256k1.sign(hash, private_key); 
  }


/*
* verifySender uses the digital signature and the seed phrase to recover the public key
* and extract the address. It then compares the address with sender's address to complete the verification
* and sends a boolean describing the verification status. 
* Output:
* True if addresses are the same, False if they aren't
*/
export function verifySender(signature, seed_phrase, address){
    // @address is of type hex already so no need to use toHex()

    let hash = keccak256(utf8ToBytes(seed_phrase));
    //document as new version makes recoverPublicKey a sub method of secp256k1.sign() and this no longer
    //needs recoverybit but must convert to RawBytes(test this last part including type)
    let publicRec = signature.recoverPublicKey(hash).toRawBytes(); 
    //
    console.log("public rec:");
    console.log(publicRec);
    let senderRec = keccak256(publicRec.slice(1)).slice(-20);
    console.log("sender rec");
    console.log(senderRec);
    return toHex(senderRec) == address, publicRec;
  }