//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;
import "./License.sol";
import "../lib/stringUtils.sol";

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
        string memory idLicense = toString(licenses.length + 1);
        applications.push(ApplicationInfo({owner:msg.sender, content_hash: _content_hash, date: block.timestamp, name: _name, id: id}));
        License license = new License();
        license.add(id, msg.sender, 0, idLicense);
        licenses.push(license);
    }

    function buy(string memory applicationId) public
    {
        License license = new License();
        string memory idLicense2 = toString(licenses.length + 1);
        license.add(applicationId, msg.sender, LICENSE_LIFE_TIME, idLicense2);
        licenses.push(license);
    }

    function getContentHash(string memory applicationId) public view returns(string memory content_hash)
    {
       for (uint index = 0; index < applications.length; index++) {
            if (StringUtils.equal(applications[index].id,applicationId))
            {
                if (permissionUseApplication(applications[index].id))
                    return applications[index].content_hash;
            }
       }
    }

    function getAll() public view returns (ApplicationInfo[] memory)
    {
        uint counter = 0;
        for (uint i = 0 ; i < applications.length ; i++) {
            counter++;
        }
        ApplicationInfo[] memory ret = new ApplicationInfo[](counter);
        uint j = 0;
        for (uint i = 0; i < applications.length ; i++) {
            ret[j] = applications[i];
            ret[j].content_hash = "";
            j++;
        }
        return ret;
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
                ret[j].content_hash = "";
                j++;
            }
        }
        return ret;
    }

    function getAllbyOwnerLicense()  public view returns (ApplicationInfo[] memory)
    {
        uint counter = 0;
        
        for (uint i = 0 ; i < licenses.length ; i++) {
            if (licenses[i].owner() == msg.sender) {
                counter++;
            }
        }

        uint[] memory allInt =  new uint[](counter);
        uint j = 0;

        for (uint i = 0 ; i < licenses.length ; i++) {
            if (licenses[i].owner() == msg.sender) {
                counter++;
                (uint index,) = getIndexApplicationById(licenses[i].applicationId());
                allInt[j] = index;
                j++;
            }
        }
        ApplicationInfo[] memory ret = new ApplicationInfo[](counter);
        uint k = 0;
        for (uint i = 0; i < allInt.length ; i++) { 
            ret[k] = applications[i];
            ret[k].content_hash = "";
            k++;
        }
        return ret;
    }

    function transferLicense(string memory licenseId, address newAddress)  public returns (bool)
    {
        // check permission
        if(permissionLicense(licenseId) == false)
        {
            return false;
        }
        // transfer
        (uint index, bool exist) = getIndexLicenseById(licenseId);
        if (exist == false)
        {
            return false;
        }
        licenses[index].setNewOwner(newAddress);
        return true;
    }

    function permissionLicense(string memory licenseId)  public view returns (bool)
    {
        (uint index, bool exist) = getIndexLicenseById(licenseId);
        if (exist == false)
        {
            return false;
        }
        if (licenses[index].owner() == msg.sender)
        {
            return true;
        }
        return false;
    }

    function permissionUseApplication(string memory applicationId)  public view returns (bool)
    {
        for (uint i = 0; i < licenses.length ; i++) {
            if (licenses[i].owner() == msg.sender && StringUtils.equal(licenses[i].applicationId(), applicationId) && licenses[i].isExpired() == false) {
                return true;
            }
        }
        return false;
    }

    function getIndexApplicationById(string memory applicationId)  public view returns (uint, bool)
    {
        for (uint i = 0; i < applications.length ; i++) {
            if (StringUtils.equal(applications[i].id,applicationId)) {
                return (i, true);
            }
        }
        return (0, false);
    }

    function getIndexLicenseById(string memory licenseId)  public view returns (uint, bool)
    {
        for (uint i = 0; i < licenses.length ; i++) {
            if (StringUtils.equal(licenses[i].id(),licenseId)) {
                return (i, true);
            }
        }
        return (0, false);
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