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

    mapping (address => Friend) private friends;

    event friendChanged(address addr);

    constructor(uint256 initialSupply) ERC20("BibaCoin", "BBC") {
        _mint(msg.sender, initialSupply);
    }

    function setFriend(address addr, Friend memory value) external {
        friends[addr] = value;
        emit friendChanged(addr);
    }

    function getFriend(address addr) external view returns (Friend memory) {
        return friends[addr];
    }
}
