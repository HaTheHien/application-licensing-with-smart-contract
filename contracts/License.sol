//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;

contract License {
    string public applicationId;
    uint public expired;
    address public owner;
    string public id;

    function add(string memory _applicationId, address _owner, uint _expired, string memory _id) public
    {
        applicationId = _applicationId;
        expired = _expired == 0 ? 0 : block.timestamp + _expired;
        owner = _owner;
        id = _id;
    }

    function setNewOwner(address newOwner) public
    {
        owner = newOwner;
    }

    function isExpired() public view returns(bool) {
        if (expired == 0)
            return false;
        if (expired < block.timestamp)
        {
            return true;
        } 
        return false;
    }
}

