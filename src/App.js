import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import "./App.css";
import AccountBalance from "./components/account-balance";
import ContractIntegration from "./components/contract-integration";
import useNetworkListener from "./hooks/use-network-listener";
import useSwitchChain from "./hooks/use-switch-chain";
import injected from "./utils/wallet-connector";

function App() {
  const { active, account, error, activate, deactivate } = useWeb3React();
  const [currentChainId, setCurrentChainId] = useState();

  const switchChain = useSwitchChain();
  const { chainId } = useNetworkListener();

  const provider = window.ethereum;
  const isConnected = JSON.parse(localStorage.getItem("isConnected"));

  useEffect(() => {
    if (chainId === 4 || chainId === 97) {
      setCurrentChainId(chainId);
    } else {
      disconnect();
    }
  }, [chainId]);

  useEffect(() => {
    if (error && error.name === "UnsupportedChainIdError") {
      switchChain(currentChainId ?? 4);
    }
  }, [error]);

  useEffect(() => {
    if (isConnected) connect();
  }, []);

  const connect = async () => {
    if (!provider) {
      console.log("You have to install Metamask");
    } else {
      try {
        await activate(injected);
        localStorage.setItem("isConnected", JSON.stringify(true));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("isConnected");
  };

  const switchChainHandler = async (e) => {
    const chainId = e.target.value;
    const result = await switchChain(chainId);
    if (result) setCurrentChainId(chainId);
  };

  return (
    <div className="App">
      <header className="App-header">
        {active ? (
          <>
            <div>Your account: {account}</div>
            <AccountBalance chainId={currentChainId} account={account} />
            <div style={{ display: "flex" }}>
              <select
                value={currentChainId}
                onChange={(e) => switchChainHandler(e)}
              >
                <option value={4}>Rinkeby</option>
                <option value={97}>BNB Chain Testnet</option>
              </select>
              <button onClick={disconnect}>Disconnect</button>
            </div>
            <ContractIntegration account={account} />
          </>
        ) : (
          <button onClick={connect}>Connect Wallet</button>
        )}
      </header>
    </div>
  );
}

export default App;
