## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server or `nodemon index` which automatically reloads the server anytime there is a change

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.  

Install nodemon using `npm install nodemon -g` in order to use it on the CLI.



### Changes

With the introduction of newer versions of the etherum-cryptography and curves libraries a number of changes to the tutorial
were required to implement a digital signature. These changes are documented below.

**Library Imports**  

Ethereum-cryptography uses ESJ modules instead of commonJS therefore `require()` cannot be used  `import` must be used instead. Dynamic importing might work if one must use commonJS in the same js file. However the straight forward solution is to create a custom module for
the cryptographic functions and use `require()` to import that.

`Sign ` doesn't come with the default export of `ethereum-cryptography/seckp256k1` therefore one must import `@noble/curves/secp256k1` as `secp` for example and use it from there instead.

**Function changes**

`Sign` no longer requires you to explicity set `recovered` to `true` in order to enable the recovery bit to recover the public key. It does it by default therefore the only parameters are the hash and the private key. In addition, it returns only the signature. 

`recoverPublicKey` is a function of the signature returned from `sign()` therefore you use as follows:

```
import {secp256k1} from "@nobel/curves/seckp256k1"

    let signature = seckp256k1.sign(hash, private key);
    let public_key = signature.recoverPublicKey(hash)    
```

