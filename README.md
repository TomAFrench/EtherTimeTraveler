<p align="center">
    <img width="100px" height="100px" src="https://raw.githubusercontent.com/TomAFrench/EtherTimeTraveler/master/time_travel.svg">
</p>

 
# ether-time-traveler
A utility that simplifies writing time dependent or stateless tests on a local Ethereum blockchain.

Forked from [ejwessel's ganache-time-traveler](https://github.com/ejwessel/GanacheTimeTraveler) to allow use in a testing environment using [ethers.js](https://github.com/ethers-io/ethers.js).

## Install
- `npm i ether-time-traveler`

## Usage
The general outline is to add `require` at the top of your tests
```javascript
const timeMachine = require('ether-time-traveler');
```

add the `beforeEach` and `afterEach` hooks into your test file
 ```javascript
contract('Test', async (accounts) =>  {

    const provider = new MockProvider();
    let exampleContract;

    beforeEach(async() => {
        let snapshotId = await timeMachine.takeSnapshot(provider);
    };

    afterEach(async() => {
        await timeMachine.revertToSnapshot(provider, snapshotId);
    });

    before('Deploy Contracts', async() => {
        /* DEPLOY CONTRACTS HERE */
        exampleContract = await ExampleContract.new();
    });

    /* ADD TESTS HERE */

    it('Time Dependent Test', async () => {
        await timeMachine.advanceTimeAndBlock(provider, SECONDS_TO_ADVANCE_BY)
    });
});
 ```

## Methods
### `advanceTime(<ethers_provider>, <seconds_to_advance_by>)`
Advances the time on the blockchain forward. Takes an extra parameter, which is the number of seconds to advance by.
Note: for advancetime() to take effect, the block must also be mined using `advanceBlock()`. See `advanceTimeAndBlock()` to do both.

### `advanceBlock(<ethers_provider>)`
Mines a new block; advances the block forward by 1 block.

### `advanceBlockAndSetTime(<ethers_provider>, <new_time>)`
Advances the block forward by 1 and **sets** the time to a new time.

### `advanceTimeAndBlock(<ethers_provider>, <seconds_to_advance_by>)`
Advances the block by 1 in addition to advancing the time on the blockchain forward. Takes an extra parameter, which is the number of seconds to advance by.

### `takeSnapshot(<ethers_provider>)`
Snapshot the state of the blockchain at the current block. Returns the integer id of the snapshot created.

### `revertToSnapshot(<ethers_provider>, <id_to_revert_to>)`
Revert the state of the blockchain to a previous snapshot. Takes an extra parameter, which is the snapshot id to revert to.

## Resources
- [Icon created by Berkah Icon from Noun Project](https://thenounproject.com/berkahicon/uploads/?i=2381810)