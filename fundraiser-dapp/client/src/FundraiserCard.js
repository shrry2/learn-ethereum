import React, { useEffect, useState } from 'react';

import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import useFundraiser from './hooks/useFundraiser';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 450,
    height: 400,
  },
  media: {
    height: 140,
  },
}));

const FundraiserCard = ({fundraiserAddress}) => {
  const classes = useStyles();

  const { contract } = useFundraiser(fundraiserAddress);
  const [fund, setFund] = useState({
    name: 'Loading...',
    description: '',
    totalDonations: 0,
    donationCount: 0,
    imageURL: '',
    url: '',
  });

  const loadFundraiser = async () => {
    if(!contract) {
      return;
    }
    try {
      setFund({
        name: await contract.methods.name().call(),
        description: await contract.methods.description().call(),
        totalDonations: await contract.methods.totalDonations().call(),
        donationCount: 0,
        imageURL: await contract.methods.imageURL().call(),
        url: await contract.methods.url().call(),
      });
    } catch (e) {
      setFund({
        name: 'Failed to load fundraiser',
        description: '',
        totalDonations: 0,
        donationCount: 0,
        imageURL: '',
        url: '',
      });
      console.error(e);
    }
  }

  useEffect(() => {
    loadFundraiser();
  }, [contract]);

  return (
    <div className="fundraiser-card-content">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media}
                     image={fund.imageURL}
                     title="Fundraiser image"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {fund.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <p>{fund.description}</p>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default FundraiserCard;
