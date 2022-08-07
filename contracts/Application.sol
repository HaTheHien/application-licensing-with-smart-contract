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

    // add new application
    function add(string memory _content_hash, string memory _name) public
    {
        // generate id
        string memory id = StringUtils.toString(uint(keccak256(abi.encodePacked(block.timestamp,
                                          msg.sender,
                                          _name,
                                          applications.length))));
        string memory idLicense = StringUtils.toString(uint(keccak256(abi.encodePacked(block.timestamp,
                                          msg.sender,
                                          licenses.length))));

        // add application and license
        applications.push(ApplicationInfo({owner:msg.sender, content_hash: _content_hash, date: block.timestamp, name: _name, id: id}));
        License license = new License();
        license.add(id, msg.sender, 0, idLicense);
        licenses.push(license);
    }

    // change hash content
    function changeHashContent(string memory _new_content_hash, string memory _applicationId) public returns(bool)
    {
        (uint index, bool exist) = getIndexApplicationById(_applicationId);
        if (exist == false)
        {
            return false;
        }
        applications[index].content_hash = _new_content_hash;
        return true;
    }

    // buy application
    function buy(string memory applicationId) public returns(bool)
    {
        //check application exist
        (, bool exist) = getIndexApplicationById(applicationId);
        if (exist == false)
        {
            return false;
        }

        // add license
        License license = new License();
        string memory idLicense2 = StringUtils.toString(uint(keccak256(abi.encodePacked(block.timestamp,
                                          msg.sender,
                                          licenses.length + 1))));
        license.add(applicationId, msg.sender, LICENSE_LIFE_TIME, idLicense2);
        licenses.push(license);
        return true;
    }

    // get content hash of file
    function getContentHash(string memory applicationId) public view returns(string memory content_hash)
    {
        // find application and get content hash
       for (uint index = 0; index < applications.length; index++) {
            if (StringUtils.equal(applications[index].id,applicationId))
            {
                return applications[index].content_hash;
            }
       }
       return "";
    }

    // get all application
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
            j++;
        }
        return ret;
    }

    // get all my application 
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

    // get all application can use
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
            k++;
        }
        return ret;
    }

    // transfer permission to another address
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

    // permision use one license
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

    // permission use one application
    function permissionUseApplication(string memory applicationId)  public view returns (bool)
    {
        for (uint i = 0; i < licenses.length ; i++) {
            if (licenses[i].owner() == msg.sender && StringUtils.equal(licenses[i].applicationId(), applicationId) && licenses[i].isExpired() == false) {
                return true;
            }
        }
        return false;
    }

    // get index one application by id
    function getIndexApplicationById(string memory applicationId)  public view returns (uint, bool)
    {
        for (uint i = 0; i < applications.length ; i++) {
            if (StringUtils.equal(applications[i].id,applicationId)) {
                return (i, true);
            }
        }
        return (0, false);
    }

    // get index one license by id
    function getIndexLicenseById(string memory licenseId)  public view returns (uint, bool)
    {
        for (uint i = 0; i < licenses.length ; i++) {
            if (StringUtils.equal(licenses[i].id(),licenseId)) {
                return (i, true);
            }
        }
        return (0, false);
    }
}