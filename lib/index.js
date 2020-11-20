"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revertToSnapshot = exports.takeSnapshot = exports.advanceTimeAndBlock = exports.advanceBlockAndSetTime = exports.advanceBlock = exports.advanceTime = void 0;
/*
 * Use of code from https://medium.com/edgefund/time-travelling-truffle-tests-f581c1964687
 * Utility functions to advance blocktime and mine blocks artificially for EVM
 */
/**
 * @description Increases the timestamp of the next block to be mined
 * @param provider - ethers.js provider
 * @param time - time to increase the timestamp of the next block by measured in seconds
 */
var advanceTime = function (provider, time) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, provider.send("evm_increaseTime", [time])];
    });
}); };
exports.advanceTime = advanceTime;
/**
 * @description Mines a block
 * @param provider - ethers.js provider
 */
var advanceBlock = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, provider.send("evm_mine", [])];
    });
}); };
exports.advanceBlock = advanceBlock;
/**
 * @description Mines a block at the given timestamp
 * @param provider - ethers.js provider
 * @param time - timestamp in seconds at which block is mined
 */
var advanceBlockAndSetTime = function (provider, time) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, provider.send("evm_mine", [time])];
    });
}); };
exports.advanceBlockAndSetTime = advanceBlockAndSetTime;
/**
 * @description Increases the timestamp of the next block to be mined and then mines it
 * @param provider - ethers.js provider
 * @param time - difference between timestamp of last block to which the block is mined
 */
var advanceTimeAndBlock = function (provider, time) { return __awaiter(void 0, void 0, void 0, function () {
    var block, forwardTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.getBlock("latest")];
            case 1:
                block = _a.sent();
                forwardTime = block.timestamp + time;
                return [2 /*return*/, exports.advanceBlockAndSetTime(provider, forwardTime)];
        }
    });
}); };
exports.advanceTimeAndBlock = advanceTimeAndBlock;
/**
 * @description Snapshot the state of the blockchain at the current block
 * @param provider - ethers.js provider
 * @returns the string id of the snapshot taken
 */
var takeSnapshot = function (provider) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, provider.send("evm_snapshot", [])];
    });
}); };
exports.takeSnapshot = takeSnapshot;
/**
 * @description Revert the state of the blockchain to a previous snapshot
 * @param provider - ethers.js provider
 * @param id - the id of the snapshot to revert to
 * @returns a boolean of whether the revert was successful
 */
var revertToSnapshot = function (provider, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, provider.send("evm_revert", [id])];
    });
}); };
exports.revertToSnapshot = revertToSnapshot;
