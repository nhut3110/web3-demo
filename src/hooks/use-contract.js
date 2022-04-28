import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

const useContract = (contractAddress, ABI) => {
  const { library, account } = useWeb3React();
  if (!contractAddress || !ABI) return;
  try {
    return new ethers.Contract(
      contractAddress,
      ABI,
      library.getSigner(account)
    );
  } catch (error) {
    console.log(error);
  }
};

export default useContract;
