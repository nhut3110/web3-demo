const useSwitchChain = () => {
  return async (chainId) => {
    const provider = window.ethereum;
    if (!provider) return false;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
      });

      return true;
    } catch (error) {
      console.log(error);
      // if (error.code === 4902) {
      //   try {
      //     await ethereum.request({
      //       method: 'wallet_addEthereumChain',
      //       params: [
      //         {
      //           chainId: '0xf00',
      //           chainName: '...',
      //           rpcUrls: ['https://...'] /* ... */,
      //         },
      //       ],
      //     });
      //   } catch (addError) {
      //     // handle "add" error
      //   }
      return false;
    }
  };
};

export default useSwitchChain;
