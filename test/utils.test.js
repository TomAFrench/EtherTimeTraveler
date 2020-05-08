const { expect } = require('chai');
const { MockProvider } = require('ethereum-waffle');
const helper = require('../utils.js')

const SECONDS_IN_DAY = 86400
const provider = new MockProvider();

describe('Test Utils', async () =>  {
    it("Test advanceBlock", async() => {
        //grab block before advancing blocks 
        const blockBefore = await provider.getBlock('latest')
        const blockNumberBefore = blockBefore.number

        await helper.advanceBlock(provider)
        
        //grab block after advancing blocks 
        const blockAfter = await provider.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        expect(blockNumberBefore + 1, "New block was not mined").to.equal(blockNumberAfter)
    })

    it("Test advanceTime", async() => {
        const blockBefore = await provider.getBlock('latest')
        const blockNumberBefore = blockBefore.number
        const timeBefore = blockBefore.timestamp

        await helper.advanceTime(provider, SECONDS_IN_DAY);
        //time doesn't update unless block is mined
        await helper.advanceBlock(provider)
        
        const blockAfter = await provider.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        expect(blockNumberBefore + 1, "New block was not mined").to.equal(blockNumberAfter)

        const timeAfter = blockAfter.timestamp
        expect(timeBefore, "Time was not advanced").to.be.below(timeAfter)
    })

    it("Test advanceBlockAndSetTime", async() => {
        const blockBefore = await provider.getBlock('latest')
        const blockNumberBefore = blockBefore.number
        const timeBefore = blockBefore.timestamp
        
        // move time backwards
        await helper.advanceBlockAndSetTime(provider, timeBefore - SECONDS_IN_DAY);
        
        const blockAfter = await provider.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        const timeAfter = blockAfter.timestamp
        expect(timeAfter, "Time was not set back").to.be.below(timeBefore)
        expect(blockNumberBefore, "Block was not advanced").to.be.below(blockNumberAfter)
    })

    it("Test advanceTimeAndBlock", async() => {
        const blockBefore = await provider.getBlock('latest') 
        const blockNumberBefore = blockBefore.number
        const timeBefore = blockBefore.timestamp

        await helper.advanceTimeAndBlock(provider, SECONDS_IN_DAY);
        
        const blockAfter = await provider.getBlock('latest')
        const blockNumberAfter = blockAfter.number
        const timeAfter = blockAfter.timestamp
        expect(timeBefore, "Time and Block were not advanced").to.be.below(timeAfter)
        expect(blockNumberBefore, "Block was not advanced").to.be.below(blockNumberAfter)
    })

    it("Test takeSnapshot", async() => {
        const snapshotId = await helper.takeSnapshot(provider)
        expect(snapshotId, "Unable to produce snapshot").to.exist
    })

    it("Test revertToSnapshot", async() => {
        // grab block before advancing time
        const snapshotId = await helper.takeSnapshot(provider)
        const blockBefore = await provider.getBlock('latest')
        const timeBefore = blockBefore.timestamp

        // advance time forward
        await helper.advanceTimeAndBlock(provider, SECONDS_IN_DAY)
        const blockAfter = await provider.getBlock('latest')
        const timeAfter = blockAfter.timestamp
        expect(timeBefore, "Time was not advanced").to.be.below(timeAfter)

        await helper.revertToSnapshot(provider, snapshotId)

        //grab block after reverting time
        const blockReverted = await provider.getBlock('latest')
        const timeReverted = blockReverted.timestamp
        expect(timeBefore, "Time and block were not reverted").to.equal(timeReverted)
    })
});
