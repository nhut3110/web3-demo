import React, { useState, useEffect } from "react";
import ABI from "../abis/contract.json";
import useContract from "../hooks/use-contract";

const ContractIntegration = ({ account }) => {
  const [balance, setBalance] = useState();
  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);

  const contract = useContract(
    "0xBA46f77cAEBb773EA491F09633459094bcCDf5D8",
    ABI
  );

  useEffect(() => {
    const getBalance = async () => {
      const res = await contract.balances(account);
      setBalance(parseInt(res));
    };

    if ((contract, account)) getBalance();
  }, [contract, account]);

  const sendAmountHandler = async () => {
    setSending(true);
    const res = await contract.transfer(
      amount,
      "0xda19364176fbF045dD96196CA6e5147291EfCBEb",
      "0x7d49a86d569D1a03361EaCF9f51c4E415F2e1Fe8"
    );

    if (res && res.hash) {
      await res.wait();
      setSending(false);
    }
  };

  // const getTransactionReceipt()

  return (
    <>
      Balance: {balance}
      <div>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={sendAmountHandler} disabled={sending}>
          Send
        </button>
      </div>
    </>
  );
};

export default ContractIntegration;
