import { useEffect, useState } from "react";

const useNetworkListener = () => {
  const provider = window.ethereum;
  const [chainId, setChainId] = useState();

  useEffect(() => {
    if (!provider) return;

    const updateChainId = async () => {
      const chainId = await provider.request({ method: "eth_chainId" });
      console.log(parseInt(chainId, 16));
      setChainId(parseInt(chainId, 16));
    };

    updateChainId();

    provider.on("chainChanged", (networkId) => {
      setChainId(parseInt(networkId, 16));
    });
  }, []);

  return { chainId };
};

export default useNetworkListener;
