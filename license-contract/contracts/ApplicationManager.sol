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

  function getApplication(uint256 _appId)
    public
    view
    returns (
      uint256,
      uint256,
      string memory,
      string memory,
      uint256,
      uint256,
      uint256
    )
  {
    //    require(_isApplicationExist(_appId));
    return (
      _appId,
      getPrice(_appId),
      getContentHashByAppId(_appId),
      getNameByAppId(_appId),
      getDateCreatedByAppId(_appId),
      getVersionByAppId(_appId),
      getTotalSoldByAppId(_appId)
    );
  }

  function getNumberOfApplications() public view returns (uint256) {
    return appIds.length;
  }
}