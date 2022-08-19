// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Application2.sol";

contract License2 is Ownable {
  event Transferred(address newOwner);

  uint256 public applicationId;
  uint256 public dateCreated;
  uint256 public dateExpired;

  Application2 public application;

  constructor(
    uint256 _applicationId,
    uint256 _dateCreated,
    uint256 _dateExpired,
    address payable _licenseOwner,
    address payable _applicationAddress
  ) {
    applicationId = _applicationId;
    dateCreated = _dateCreated;
    dateExpired = _dateExpired;

    application = Application2(_applicationAddress);
    Ownable.transferOwnership(_licenseOwner);
  }

  function getLicense()
    public
    view
    returns (
      uint256,
      uint256,
      uint256
    )
  {
    return (applicationId, dateCreated, dateExpired);
  }

  function checkOwner(address _owner) public view returns (bool) {
    return
      _owner == owner() && (dateExpired >= block.timestamp || dateExpired == 0);
  }

  function transferLicense(address newOwner) public payable onlyOwner {
    require(address(application) != address(0), "No application");
    application.onLicenseOwnerChanged(Ownable.owner(), address(newOwner));

    Ownable.transferOwnership(newOwner);
    emit Transferred(newOwner);
  }
}
