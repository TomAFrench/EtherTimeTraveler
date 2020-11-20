import { JsonRpcProvider } from "@ethersproject/providers";
/*
 * Use of code from https://medium.com/edgefund/time-travelling-truffle-tests-f581c1964687
 * Utility functions to advance blocktime and mine blocks artificially for EVM
 */

/**
 * @description Increases the timestamp of the next block to be mined
 * @param provider - ethers.js provider
 * @param time - time to increase the timestamp of the next block by measured in seconds
 */
export const advanceTime = async (provider: JsonRpcProvider, time: number): Promise<number> => {
  return provider.send("evm_increaseTime", [time]);
};

/**
 * @description Mines a block
 * @param provider - ethers.js provider
 */
export const advanceBlock = async (provider: JsonRpcProvider): Promise<void> => {
  return provider.send("evm_mine", []);
};

/**
 * @description Mines a block at the given timestamp
 * @param provider - ethers.js provider
 * @param time - timestamp in seconds at which block is mined
 */
export const advanceBlockAndSetTime = async (provider: JsonRpcProvider, time: number): Promise<void> => {
  return provider.send("evm_mine", [time]);
};

/**
 * @description Increases the timestamp of the next block to be mined and then mines it
 * @param provider - ethers.js provider
 * @param time - difference between timestamp of last block to which the block is mined
 */
export const advanceTimeAndBlock = async (provider: JsonRpcProvider, time: number): Promise<void> => {
  // capture current time
  const block = await provider.getBlock("latest");
  const forwardTime = block.timestamp + time;
  return advanceBlockAndSetTime(provider, forwardTime);
};

/**
 * @description Snapshot the state of the blockchain at the current block
 * @param provider - ethers.js provider
 * @returns the string id of the snapshot taken
 */
export const takeSnapshot = async (provider: JsonRpcProvider): Promise<string> => {
  return provider.send("evm_snapshot", []);
};

/**
 * @description Revert the state of the blockchain to a previous snapshot
 * @param provider - ethers.js provider
 * @param id - the id of the snapshot to revert to
 * @returns a boolean of whether the revert was successful
 */
export const revertToSnapshot = async (provider: JsonRpcProvider, id: string): Promise<boolean> => {
  return provider.send("evm_revert", [id]);
};
