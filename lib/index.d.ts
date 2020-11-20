import { JsonRpcProvider } from "@ethersproject/providers";
/**
 * @description Increases the timestamp of the next block to be mined
 * @param provider - ethers.js provider
 * @param time - time to increase the timestamp of the next block by measured in seconds
 */
export declare const advanceTime: (provider: JsonRpcProvider, time: number) => Promise<number>;
/**
 * @description Mines a block
 * @param provider - ethers.js provider
 */
export declare const advanceBlock: (provider: JsonRpcProvider) => Promise<void>;
/**
 * @description Mines a block at the given timestamp
 * @param provider - ethers.js provider
 * @param time - timestamp in seconds at which block is mined
 */
export declare const advanceBlockAndSetTime: (provider: JsonRpcProvider, time: number) => Promise<void>;
/**
 * @description Increases the timestamp of the next block to be mined and then mines it
 * @param provider - ethers.js provider
 * @param time - difference between timestamp of last block to which the block is mined
 */
export declare const advanceTimeAndBlock: (provider: JsonRpcProvider, time: number) => Promise<void>;
/**
 * @description Snapshot the state of the blockchain at the current block
 * @param provider - ethers.js provider
 * @returns the string id of the snapshot taken
 */
export declare const takeSnapshot: (provider: JsonRpcProvider) => Promise<string>;
/**
 * @description Revert the state of the blockchain to a previous snapshot
 * @param provider - ethers.js provider
 * @param id - the id of the snapshot to revert to
 * @returns a boolean of whether the revert was successful
 */
export declare const revertToSnapshot: (provider: JsonRpcProvider, id: string) => Promise<boolean>;
