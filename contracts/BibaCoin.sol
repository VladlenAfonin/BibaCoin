// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BibaCoin is ERC20 {
    struct Friend {
        address addr;
        bool isMarried;
        int salary;
        int32 age;
    }

    mapping (address => Friend) private _friends;

    constructor(uint256 initialSupply) ERC20("BibaCoin", "BBC") {
        _mint(msg.sender, initialSupply);
    }

    function setFriend(address addr, Friend memory value) public {
        _friends[addr] = value;
    }

    function getFriend(address addr) external view returns (Friend memory) {
        return _friends[addr];
    }
}
