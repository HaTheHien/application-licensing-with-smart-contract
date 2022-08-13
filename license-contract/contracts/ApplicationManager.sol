// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Application2.sol";

contract ApplicationManager {
  event ApplicationCreated(
    uint256 id,
    uint256 price,
    string contentHash,
    string name,
    uint256 dateCreated
  );

  event ApplicationPriceChanged(uint256 id, uint256 price);

  uint256[] public appIds;
  mapping(uint256 => Application2) public applications;

  function _isApplicationExist(uint256 _applicationId)
    internal
    view
    returns (bool)
  {
    return applications[_applicationId] != Application2(address(0));
  }

  function _isApplicationNotExist(uint256 _applicationId)
    internal
    view
    returns (bool)
  {
    return applications[_applicationId] == Application2(address(0));
  }

  function _createApplication(
    uint256 _appId,
    uint256 _price,
    string memory _contentHash,
    string memory _name,
    uint256 _dateCreated
  ) internal returns (uint256) {
    //    require(_isApplicationExist(_appId) == false);

    Application2 _app = new Application2(
      _appId,
      _price,
      _contentHash,
      _name,
      _dateCreated,
      0
    );

    _app.transferOwnership(msg.sender);

    applications[_appId] = _app;
    appIds.push(_appId);

    emit ApplicationCreated(
      _app.id(),
      _app.price(),
      _app.contentHash(),
      _app.name(),
      _app.dateCreated()
    );

    return _app.id();
  }

  //  function _setPrice(uint256 _appId, uint256 _price) internal {
  //    //    require(_isApplicationExist(_appId));
  //    applications[_appId].setPrice(_price);
  //
  //    emit ApplicationPriceChanged(_appId, _price);
  //  }

  //  function _setContentHash(uint256 _appId, string memory _contentHash)
  //    internal
  //  {
  //    //    require(_isApplicationExist(_appId));
  //
  //    applications[_appId].setContentHash(_contentHash);
  //    applications[_appId].setVersion(applications[_appId].version() + 1);
  //  }

  function _increaseSold(uint256 _appId) internal {
    //    require(_isApplicationExist(_appId));

    applications[_appId].setSoldNumber(applications[_appId].sold() + 1);
  }

  function createApplication(
    uint256 _appId,
    uint256 _price,
    string memory _contentHash,
    string memory _name,
    uint256 _dateCreated
  ) public returns (uint256) {
    return
      _createApplication(_appId, _price, _contentHash, _name, _dateCreated);
  }

  function getPrice(uint256 _appId) public view returns (uint256) {
    return applications[_appId].price();
  }

  //  function setPriceByAppId(uint256 _appId, uint256 _price) external onlyOwner {
  //    _setPrice(_appId, _price);
  //  }

  function getContentHashByAppId(uint256 _appId)
    public
    view
    returns (string memory)
  {
    return applications[_appId].contentHash();
  }

  //  function setContentHashByAppId(uint256 _appId, string memory _contentHash)
  //    external
  //  {
  //    _setContentHash(_appId, _contentHash);
  //  }

  function getNameByAppId(uint256 _appId) public view returns (string memory) {
    return applications[_appId].name();
  }

  function getDateCreatedByAppId(uint256 _appId) public view returns (uint256) {
    return applications[_appId].dateCreated();
  }

  function getVersionByAppId(uint256 _appId) public view returns (uint256) {
    return applications[_appId].version();
  }

  function getTotalSoldByAppId(uint256 _appId) public view returns (uint256) {
    return applications[_appId].sold();
  }

  function getOwnerByAppId(uint256 _appId) public view returns (address) {
    return applications[_appId].owner();
  }

  function getApplication(uint256 _appId)
    public
    view
    returns (
      uint256 id,
      uint256 price,
      string memory contentHash,
      string memory name,
      uint256 dateCreated,
      uint256 version,
      uint256 totalSold,
      address owner
    )
  {
    //    require(_isApplicationExist(_appId));
    Application2 application = applications[_appId];
    return (
      _appId,
      application.price(),
      application.contentHash(),
      application.name(),
      application.dateCreated(),
      application.version(),
      application.sold(),
      application.owner()
    );
  }

  function getApplicationFromAddress(address _appAddress)
    public
    view
    returns (
      uint256 id,
      uint256 price,
      string memory contentHash,
      string memory name,
      uint256 dateCreated,
      uint256 version,
      uint256 totalSold,
      address owner
    )
  {
    Application2 application = Application2(_appAddress);
    return (
      application.id(),
      application.price(),
      application.contentHash(),
      application.name(),
      application.dateCreated(),
      application.version(),
      application.sold(),
      application.owner()
    );
  }

  function getNumberOfApplications() public view returns (uint256) {
    return appIds.length;
  }

  function getCreatedApplications(address _owner)
    public
    view
    returns (Application2[] memory)
  {
    uint256 n = 0;
    for (uint256 i = 0; i < appIds.length; i++) {
      if (applications[appIds[i]].owner() == _owner) {
        n++;
      }
    }

    Application2[] memory applicationList = new Application2[](n);
    uint256 j = 0;
    for (uint256 i = 0; i < appIds.length; i++) {
      if (applications[appIds[i]].owner() == _owner) {
        applicationList[j] = applications[appIds[i]];
        j++;
      }
    }

    return applicationList;
  }
}
