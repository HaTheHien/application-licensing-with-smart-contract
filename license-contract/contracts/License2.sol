// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Application2.sol";

contract License2 is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  uint256 public applicationId;
  uint256 public dateCreated;
  uint256 public dateExpired;

  Application2 application;

  constructor(
    uint256 _applicationId,
    uint256 _dateCreated,
    uint256 _dateExpired,
    address _licenseOwner
  ) ERC721("LicenseToken", "L2") {
    applicationId = _applicationId;
    dateCreated = _dateCreated;
    dateExpired = _dateExpired;

    application = Application2(_licenseOwner);
    Ownable.transferOwnership(_licenseOwner);
  }

  function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
  }

  function safeMint(
    address to,
    uint256 tokenId,
    string memory uri
  ) public onlyOwner {
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  // The following functions are overrides required by Solidity.

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
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
}
