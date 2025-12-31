//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Season1Challenge3.sol";

contract Season1Challenge3Solution {

    constructor(address season1Challenge3) {
        Season1Challenge3 challenge3 = Season1Challenge3(season1Challenge3);
        challenge3.mintFlag();
    }
}
