//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Importing console for debugging (this would be removed in a production contract).
//import "hardhat/console.sol";
// We're using OpenZeppelin's utilities for counter increments and ERC721 token standards.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// The ArtCollectiveMarket is like an online art gallery where digital artists can mint and list their work as NFTs.
contract ArtCollectiveMarket is ERC721URIStorage {

    // A handy tool for keeping track of our token IDs and sales count.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    
    // The creator of the contract, who receives fees from listing NFTs.
    address payable owner;
    
    // A small fee for artists to list their work, think of it as a gallery listing fee.
    uint256 listingFee = 0.01 ether;

    // An easy way to access all the info we need about a listed piece of art.
    struct Artwork {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
    }

    // Fired off into the digital world for others to know when an artwork is listed.
    event ArtworkListed (
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    // A map linking token IDs to their corresponding artwork for easy look-up.
    mapping(uint256 => Artwork) private idToArtwork;

    constructor() ERC721("ArtCollective", "ARTC") {
        owner = payable(msg.sender);
    }

    // Only the big boss (contract creator) can change the listing fee.
    function updateListingFee(uint256 _listingFee) public payable {
        require(owner == msg.sender, "Only the gallery owner can change the listing fee.");
        listingFee = _listingFee;
    }

    // Peek at the current fee to list an artwork.
    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    // Who was the last artist to mint an NFT? Let's find out.
    function getLatestArtwork() public view returns (Artwork memory) {
        uint256 currentTokenId = _tokenIds.current();
        return idToArtwork[currentTokenId];
    }

    // Fetch the deets of a particular artwork with its token ID.
    function getArtwork(uint256 tokenId) public view returns (Artwork memory) {
        return idToArtwork[tokenId];
    }

    // How many pieces of art have we minted? This tells us.
    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    // Let's make some digital art! Minting a new NFT to represent the artwork.
    function mintArtwork(string memory tokenURI, uint256 price) public payable returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        // A helper to wrap up some housekeeping for our new NFT.
        _listArtwork(newTokenId, price);

        return newTokenId;
    }

    function _listArtwork(uint256 tokenId, uint256 price) private {
        require(msg.value == listingFee, "You gotta pay the gallery fee to list your artwork.");
        require(price > 0, "This piece of art must have value!");

        idToArtwork[tokenId] = Artwork(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);

        emit ArtworkListed(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }
    
    // Step into our virtual gallery and browse all the art currently listed.
    function browseGallery() public view returns (Artwork[] memory) {
        uint artCount = _tokenIds.current();
        Artwork[] memory gallery = new Artwork[](artCount);
        uint currentIndex = 0;
        
        for(uint i = 0; i < artCount; i++) {
            uint currentId = i + 1;
            Artwork storage currentArtwork = idToArtwork[currentId];
            gallery[currentIndex] = currentArtwork;
            currentIndex += 1;
        }
        
        return gallery;
    }
    
    // Show me all the art where I'm the artist or the current owner.
    function myCollection() public view returns (Artwork[] memory) {
        uint totalArtCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        
        for(uint i = 0; i < totalArtCount; i++) {
            if(idToArtwork[i+1].owner == msg.sender || idToArtwork[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }

        Artwork[] memory collection = new Artwork[](itemCount);
        for(uint i = 0; i < totalArtCount; i++) {
            if(idToArtwork[i+1].owner == msg.sender || idToArtwork[i+1].seller == msg.sender) {
                uint currentId = i + 1;
                Artwork storage currentItem = idToArtwork[currentId];
                collection[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return collection;
    }

    // Let's make a deal! Transfer ownership and funds for the purchase of an artwork.
    function purchaseArtwork(uint256 tokenId) public payable {
        uint price = idToArtwork[tokenId].price;
        address seller = idToArtwork[tokenId].seller;
        require(msg.value == price, unicode"The price must be just right—equal to the artwork's listed price.");

        idToArtwork[tokenId].currentlyListed = false;
        idToArtwork[tokenId].owner = payable(msg.sender);
        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        approve(address(this), tokenId);

        // The gallery takes its cut, and the artist gets the rest.
        payable(owner).transfer(listingFee);
        payable(seller).transfer(msg.value);
    }

    // That's it for now! In the future, we might let you re-list your bought art, but let's keep things simple for starters.
}
