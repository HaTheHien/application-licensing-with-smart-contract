//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;

contract License {
    string public idApplication;
    uint public expired;
    uint public valid;
    address public owner;

    function add(string memory _idApplication, uint _valid, address _owner, uint _expired) public
    {
        idApplication = _idApplication;
        expired = _expired == 0 ? 0 : block.timestamp + _expired;
        valid = _valid;
        owner = _owner;
    }

    function isExpired() public returns(bool) {
        if (expired == 0)
            return false;
        if (expired < block.timestamp)
        {
            valid = 0;
        } 
        return true;
    }
}

