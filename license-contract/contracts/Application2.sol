// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./License2.sol";
import "./ApplicationManager.sol";

contract Application2 is Ownable {
  uint256 constant LICENSE_LIFE_TIME = 365 days;

  event LicenseCreated(
    address indexed appOwner,
    address indexed owner,
    uint256 appId,
    uint256 licenseId,
    uint256 dateCreated,
    uint256 dateExpired
  );

  uint256 public id;
  uint256 public price;
  string public contentHash;
  string public name;
  uint256 public dateCreated;
  uint256 public version;
  // number of sold licenses
  uint256 public sold;

  ApplicationManager applicationManager;
  License2[] licenses;

  mapping(address => License2) ownerLicense;
  mapping(uint256 => uint256) lisenseIndex;

  constructor(
    uint256 _id,
    uint256 _price,
    string memory _contentHash,
    string memory _name,
    uint256 _dateCreated,
    uint256 _version
  ) {
    id = _id;
    price = _price;
    contentHash = _contentHash;
    name = _name;
    dateCreated = _dateCreated;
    version = _version;
    sold = 0;

    applicationManager = ApplicationManager(msg.sender);
  }

  function _isLicenseValid(uint256 _licenseId) internal view returns (bool) {
    return getApplicationId(_licenseId) != 0;
  }

  function _createLicense(uint256 _appId, address _licenseOwner)
    internal
    returns (uint256)
  {
    License2 l = new License2(
      _appId,
      block.timestamp,
      LICENSE_LIFE_TIME + block.timestamp,
      _licenseOwner
    );

    uint256 licenseId = licenses.length;
    licenses.push(l);
    emit LicenseCreated(
      Ownable.owner(),
      _licenseOwner,
      _appId,
      licenseId,
      l.dateCreated(),
      l.dateExpired()
    );

    return licenseId;
  }

  function getApplicationId(uint256 _licenseId) public view returns (uint256) {
    return licenses[_licenseId].applicationId();
  }

  function getDateCreated(uint256 _licenseId) public view returns (uint256) {
    return licenses[_licenseId].dateCreated();
  }

  function getDateExpired(uint256 _licenseId) public view returns (uint256) {
    return licenses[_licenseId].dateExpired();
  }

  function getLicense(uint256 _licenseId)
    public
    view
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    return (
      getApplicationId(_licenseId),
      getDateCreated(_licenseId),
      getDateExpired(_licenseId)
    );
  }

  function setPrice(uint256 _price) onlyOwner public {
    price = _price;
  }

  function setContentHash(string memory _contentHash) onlyOwner public {
    contentHash = _contentHash;
  }

  function setVersion(uint256 _version) onlyOwner public {
    version = _version;
  }

  function setSoldNumber(uint256 _sold) onlyOwner public {
    sold = _sold;
  }
}
