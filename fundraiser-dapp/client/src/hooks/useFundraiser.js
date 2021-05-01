import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import FundraiserContract from '../contracts/Fundraiser.json';
import { useEffect, useState } from 'react';

const useFundraiser = (fundraiserAddress) => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const init = async () => {
    if (!fundraiserAddress) {
      return;
    }
    console.log(fundraiserAddress);
    try {
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserContract.abi,
        fundraiserAddress,
      );
      setContract(instance);
      setAccounts(accounts);
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(err);
    }
  };

  useEffect(() => {
    init();
  }, [fundraiserAddress]);

  return { contract, accounts };
};

export default useFundraiser;
