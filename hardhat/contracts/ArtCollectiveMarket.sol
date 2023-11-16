// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtCollectiveMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    address payable owner;
    uint256 listingFee = 0.01 ether;

    struct Artwork {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    mapping(uint256 => Artwork) private idToArtwork;

    constructor() ERC721("ArtCollective", "ARTC") {
        owner = payable(msg.sender);
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    function mintArtwork(string memory tokenURI, uint256 price) public payable returns (uint) {
        require(msg.value == listingFee, "You gotta pay the gallery fee to list your artwork.");
        require(price > 0, "This piece of art must have value!");
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        idToArtwork[newTokenId] = Artwork(newTokenId, payable(address(this)), payable(msg.sender), price, true);
        _transfer(msg.sender, address(this), newTokenId);
        return newTokenId;
    }

    function browseGallery() public view returns (Artwork[] memory) {
        uint itemCount = _tokenIds.current();
        Artwork[] memory items = new Artwork[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            Artwork storage currentItem = idToArtwork[currentId];
            items[i] = currentItem;
        }
        return items;
    }

    function purchaseArtwork(uint256 tokenId) public payable {
        uint price = idToArtwork[tokenId].price;
        require(msg.value == price, "The price must be equal to the artwork's listed price.");
        address seller = idToArtwork[tokenId].seller;
        idToArtwork[tokenId].currentlyListed = false;
        idToArtwork[tokenId].owner = payable(msg.sender);
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingFee);
        payable(seller).transfer(msg.value);
    }

    function myCollection() public view returns (Artwork[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToArtwork[i + 1].owner == msg.sender || idToArtwork[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }
        
        Artwork[] memory items = new Artwork[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToArtwork[i + 1].owner == msg.sender || idToArtwork[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                Artwork storage currentItem = idToArtwork[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }
}
