import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const AccountBalance = ({ chainId, account }) => {
  const [balance, setBalance] = useState();
  const coinName = chainId === 4 ? "ETH" : "BNB";

  useEffect(() => {
    const getBalance = async () => {
      let provider;
      if (chainId === 4) {
        provider = new ethers.getDefaultProvider(chainId);
      } else {
        provider = new ethers.providers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s2.binance.org:8545"
        );
      }
      setBalance(null);

      const res = await provider.getBalance(account);
      console.log(ethers.utils.formatEther(res));
      setBalance(ethers.utils.formatEther(res));
    };

    getBalance();
  }, [chainId, account]);

  return (
    <>
      Account Balance: {balance ? parseFloat(balance).toFixed(4) : "loading..."}{" "}
      {coinName}
    </>
  );
};

export default AccountBalance;
