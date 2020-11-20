import { expect } from "chai";
import { MockProvider } from "ethereum-waffle";
import {
  advanceBlock,
  advanceBlockAndSetTime,
  advanceTime,
  advanceTimeAndBlock,
  revertToSnapshot,
  takeSnapshot,
} from "../src";

const SECONDS_IN_DAY = 86400;
const provider = new MockProvider();

describe("Unit tests", async () => {
  describe("advanceBlock", async () => {
    it("mines a block", async () => {
      // grab block before advancing blocks
      const blockBefore = await provider.getBlock("latest");
      const blockNumberBefore = blockBefore.number;

      await advanceBlock(provider);

      // grab block after advancing blocks
      const blockAfter = await provider.getBlock("latest");
      const blockNumberAfter = blockAfter.number;
      expect(blockNumberBefore + 1, "New block was not mined").to.equal(blockNumberAfter);
    });
  });

  describe("advanceTime", async () => {
    it("increases the timestamp of the next block", async () => {
      const blockBefore = await provider.getBlock("latest");
      const blockNumberBefore = blockBefore.number;
      const timeBefore = blockBefore.timestamp;

      await advanceTime(provider, SECONDS_IN_DAY);
      // time doesn't update unless block is mined
      await advanceBlock(provider);

      const blockAfter = await provider.getBlock("latest");
      const blockNumberAfter = blockAfter.number;
      const timeAfter = blockAfter.timestamp;
      expect(blockNumberBefore + 1, "New block was not mined").to.equal(blockNumberAfter);
      expect(timeBefore + SECONDS_IN_DAY, "Time was not advanced by given amount").to.equal(timeAfter);
    });
  });

  describe("advanceBlockAndSetTime", async () => {
    it("mines a block with the given timestamp", async () => {
      const blockBefore = await provider.getBlock("latest");
      const blockNumberBefore = blockBefore.number;
      const timeBefore = blockBefore.timestamp;

      // move time backwards
      const targetTime = timeBefore - SECONDS_IN_DAY;
      await advanceBlockAndSetTime(provider, targetTime);

      const blockAfter = await provider.getBlock("latest");
      const blockNumberAfter = blockAfter.number;
      const timeAfter = blockAfter.timestamp;
      expect(timeAfter, "Time was not set back").to.equal(targetTime);
      expect(blockNumberBefore, "Block was not advanced").to.be.below(blockNumberAfter);
    });
  });

  describe("advanceTimeAndBlock", async () => {
    it("increases timestamp by given amount before mining a block", async () => {
      const blockBefore = await provider.getBlock("latest");
      const blockNumberBefore = blockBefore.number;
      const timeBefore = blockBefore.timestamp;

      await advanceTimeAndBlock(provider, SECONDS_IN_DAY);

      const blockAfter = await provider.getBlock("latest");
      const blockNumberAfter = blockAfter.number;
      const timeAfter = blockAfter.timestamp;
      expect(timeBefore, "Time and Block were not advanced").to.be.below(timeAfter);
      expect(blockNumberBefore, "Block was not advanced").to.be.below(blockNumberAfter);
    });
  });

  describe("takeSnapshot", async () => {
    it("returns the snapshot's id", async () => {
      const snapshotId = await takeSnapshot(provider);
      // eslint-disable-next-line no-unused-expressions
      expect(snapshotId, "Unable to produce snapshot").to.exist;
    });
  });

  describe("revertToSnapshot", async () => {
    let snapshotId: string;
    let timeBefore: number;
    let timeAfter: number;
    beforeEach(async function() {
      // grab block before advancing time
      snapshotId = await takeSnapshot(provider);
      const blockBefore = await provider.getBlock("latest");
      timeBefore = blockBefore.timestamp;

      // advance time forward
      await advanceTimeAndBlock(provider, SECONDS_IN_DAY);
      const blockAfter = await provider.getBlock("latest");
      timeAfter = blockAfter.timestamp;
      expect(timeBefore, "Time was not advanced").to.be.below(timeAfter);
    });

    it("reverts to the snapshotted block", async () => {
      await revertToSnapshot(provider, snapshotId);

      // grab block after reverting time
      const blockReverted = await provider.getBlock("latest");
      const timeReverted = blockReverted.timestamp;
      expect(timeBefore, "Time and block were not reverted").to.equal(timeReverted);
    });

    it("reports true on a successful revert", async () => {
      const success = await revertToSnapshot(provider, snapshotId);
      // eslint-disable-next-line no-unused-expressions
      expect(success, "Did not report successful revert").to.be.true;
    });
  });
});
