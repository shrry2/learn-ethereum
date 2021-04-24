const FundraiserContract = artifacts.require('Fundraiser');

contract('Fundraiser', (accounts) => {
  let fundraiser;
  const name = 'Beneficiary Name';

  describe('initialization', () => {
    beforeEach(async () => {
      fundraiser = await FundraiserContract.new(name);
    });

    it('gets the beneficially name', async () => {
      const actual = await fundraiser.name();
      assert.equal(actual, name, 'names should match');
    });
  });
});
