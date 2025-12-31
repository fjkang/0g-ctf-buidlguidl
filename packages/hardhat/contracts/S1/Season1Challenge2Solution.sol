//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Season1Challenge2.sol";

contract Season1Challenge2Solution {
    address public season1Challenge2;

    constructor(address _season1Challenge2) {
        season1Challenge2 = _season1Challenge2;
    }

    function mintFlag() public {
        Season1Challenge2(season1Challenge2).justCallMe();
    }
}
