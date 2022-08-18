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
  mapping(License2 => uint256) licenseIndex;

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

  modifier priceOk(uint256 _price) {
    require(_price >= price, "Not enough amount to buy this license");

    _;
  }

  modifier fromLicenseOwner(address owner, License2 license) {
    require(ownerLicense[owner] == license, "Invalid license owner");

    _;
  }

  modifier licenseExists(address owner) {
    require(address(ownerLicense[owner]) != address(0), "License not found");
    _;
  }

  function _isLicenseValid(uint256 _licenseId) internal view returns (bool) {
    return licenses[_licenseId] != License2(address(0));
  }

  function _createLicense(address payable _licenseOwner)
    internal
    returns (uint256)
  {
    License2 l = new License2(
      id,
      block.timestamp,
      LICENSE_LIFE_TIME + block.timestamp,
      _licenseOwner,
      payable(address(this))
    );

    uint256 licenseId = licenses.length;
    licenses.push(l);
    ownerLicense[_licenseOwner] = l;
    licenseIndex[l] = licenses.length - 1;
    sold++;

    emit LicenseCreated(
      Ownable.owner(),
      _licenseOwner,
      id,
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

  function setPrice(uint256 _price) public onlyOwner {
    price = _price;
  }

  function setContentHash(string memory _contentHash) public onlyOwner {
    contentHash = _contentHash;
  }

  function setVersion(uint256 _version) public onlyOwner {
    version = _version;
  }

  function setSoldNumber(uint256 _sold) public onlyOwner {
    sold = _sold;
  }

  function getAllLicenses() external view returns (License2[] memory) {
    return licenses;
  }

  function getLicenseStruct(address _ownerAddress)
    public
    view
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    require(
      address(ownerLicense[_ownerAddress]) != address(0),
      "License not found"
    );

    License2 license = ownerLicense[_ownerAddress];
    return (
      license.applicationId(),
      license.dateCreated(),
      license.dateExpired()
    );
  }

  function getLicenseFromAddress(address _ownerAddress)
    external
    view
    returns (License2)
  {
    return ownerLicense[_ownerAddress];
  }

  function onLicenseOwnerChanged(address oldOwner, address newOwner)
    public
    payable
    licenseExists(oldOwner)
    fromLicenseOwner(oldOwner, License2(msg.sender))
  {
    delete ownerLicense[payable(address(oldOwner))];
    ownerLicense[newOwner] = License2(msg.sender);
  }

  receive() external payable priceOk(msg.value) {
    payable(address(Ownable.owner())).transfer(msg.value);
    _createLicense(payable(msg.sender));
  }
}
