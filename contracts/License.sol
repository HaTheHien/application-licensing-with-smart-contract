pragma solidity ^0.8.6;

contract Application {
    uint constant LICENSE_LIFE_TIME = 30 days;
    struct ApplicationInfo {
        address owner;
        string content_hash;
        string name;
        uint date;
        string id;
    }
    
    ApplicationInfo[] public applications;
    License[] public licenses;

    function add(string memory _content_hash, string memory _name) public
    {
        string memory id = toString(applications.length + 1);
        applications.push(ApplicationInfo({owner:msg.sender, content_hash: _content_hash, date: block.timestamp, name: _name, id: id}));
        licenses.push(new License(id, 1, msg.sender, 0));
    }

    function buy(string memory idApplication) public
    {
        licenses.push(new License(idApplication, 1, msg.sender, LICENSE_LIFE_TIME));
    }

    function getAll() public view returns (ApplicationInfo[] memory)
    {
        return applications;
    }

    function getAllbyOwnerAddress()  public view returns (ApplicationInfo[] memory)
    {
        uint counter = 0;
        for (uint i = 0 ; i < applications.length ; i++) {
            if (applications[i].owner == msg.sender) {
                counter++;
            }
        }
        ApplicationInfo[] memory ret = new ApplicationInfo[](counter);
        uint j = 0;
        for (uint i = 0; i < applications.length ; i++) {
            if (applications[i].owner == msg.sender) {
                ret[j] = applications[i];
                j++;
            }
        }
        return ret;
    }

    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}

contract License {
    string public idApplication;
    uint public expired;
    uint public valid;
    address public owner;

    constructor (string memory _idApplication, uint _valid, address _owner, uint _expired)
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
