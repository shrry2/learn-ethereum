import React, { useEffect, useState } from 'react';
import useFundraiserFactory from './hooks/useFundraiserFactory';
import FundraiserCard from './FundraiserCard';

const Home = () => {
  const { contract, accounts } = useFundraiserFactory();
  const [funds, setFunds] = useState([]);

  const loadFunds = async () => {
    try {
      if (!contract || !accounts) {
        return;
      }
      const funds = await contract.methods.fundraisers(10, 0).call();
      setFunds(funds);
    } catch (err) {
      alert(
        `Failed to load funds.`,
      );
      console.error(err);
    }
  };

  useEffect(() => {
    loadFunds();
  }, [contract, accounts]);

  return (
    <div>
      <h2>Home</h2>
      {funds.length && funds.map((fundraiserAddress) => (<FundraiserCard key={fundraiserAddress}
                                                                         fundraiserAddress={fundraiserAddress}/>))}
    </div>
  );
};

export default Home;
