//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Season1Challenge6.sol";

contract Season1Challenge6Solution is IContract6Solution {
    Season1Challenge6 challenge6;
    constructor(address _challenge6) {
        challenge6 = Season1Challenge6(_challenge6);
    }
    // 实现name接口函数
    function name() public pure returns (string memory) {
        return "BG CTF Challenge 6 Solution";
    }

    function mintFlag() public {
        // 传入当前count对应的code，并且设置gas值（190_000和200_000之间）
        challenge6.mintFlag{gas: 195_000}(challenge6.count() << 8);
    }
}
