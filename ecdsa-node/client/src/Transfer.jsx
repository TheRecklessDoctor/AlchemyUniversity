import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    //TODO: change back to taking input from prompts
    //TODO: document functions properly
    //TODO: document changes that occured due to version changes

    try {
      let seed_phrase = prompt("Please enter your seed phrase", "xxxx - xxxx - xxxx - xxxx - xxxx - xxxx");
      let private_key = prompt("Please enter your private key", "xxxxxxxxx");
      let public_key = prompt("Please enter your public key", 'xxxxxxxxx');

      // let seed_phrase = "anxiety tornado rent brain bronze work";
      // let private_key = "aa153535829de31d961f6a4ecdb4d87c20c9d2bfd0aea32820d6a2a151a93908";
      // let public_key = "034005a6f4854e64d605f3bfb1cc86cd3fc0844e24baa5c753c4a4ca305ba5599f";
      
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        seed_phrase,
        private_key,
        public_key
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
