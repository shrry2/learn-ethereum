import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import FundraiserFactoryContract from '../contracts/FundraiserFactory.json';
import { useEffect, useState } from 'react';

const useFundraiserFactory = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);

  const init = async () => {
    try {
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserFactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserFactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
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
  }, []);

  return { contract, accounts };
};

export default useFundraiserFactory;
