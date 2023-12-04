# CryptoKazakh NFT Marketplace
Welcome to the GitHub repository of CryptoKazakh, a unique digital marketplace designed to foster global appreciation and preservation of Kazakh culture. This decentralized application (dApp) leverages blockchain technology to provide a platform for artists and cultural enthusiasts to create, buy and explore Kazakh-themed Non-Fungible Tokens (NFTs).

## Table of Contents
- [How to run the DApp?](#how-to-run-the-dapp)
- [Smartcontract Explanation](#smartcontract-explanation)
- [Financial Analysis](#financial-analysis)
- [Interfaces](#interfaces)
  - [Homepage](#homepage)
  - [Create New NFT](#create-new-nft)
  - [Explore Page](#explore-page)
  - [My NFTs](#my-nfts)
  - [404 Error Page](#404-error-page)
- [Designs](#designs)
- [Developers](#developers)
- [Contributing](#contributing)

## How to run the DApp?

To set up the repository and run the marketplace locally, run the below
```bash
git clone https://github.com/aBacoding/CryptoKazakh
cd frontend
npm install
npm start
```

To set up and run the smartcontracts, run the below
```bash
git clone https://github.com/aBacoding/CryptoKazakh
cd hardhat
npx hardhat compile
npx hardhat run --network sepolia scripts/deploy.ts
```

## Smartcontract Explanation
```bash
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// Importing OpenZeppelin's ERC721URIStorage and Counters contracts.
// ERC721URIStorage is an ERC721 token with storage for a URI.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Contract declaration for ArtCollectiveMarket, inheriting from ERC721URIStorage.
contract ArtCollectiveMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Counter for token IDs.
    Counters.Counter private _itemsSold; // Counter for items sold.

    address payable owner; // Address of the contract owner.
    uint256 listingFee = 0.01 ether; // Listing fee for minting an artwork.

    // Struct to represent an artwork.
    struct Artwork {
        uint256 tokenId; // Unique ID of the artwork.
        address payable owner; // Owner of the artwork.
        address payable seller; // Seller of the artwork.
        uint256 price; // Price of the artwork.
        bool currentlyListed; // Whether the artwork is listed for sale.
    }

    // Mapping from token ID to its respective Artwork.
    mapping(uint256 => Artwork) private idToArtwork;

    // Constructor sets the name and symbol of the token and initializes the contract owner.
    constructor() ERC721("ArtCollective", "ARTC") {
        owner = payable(msg.sender);
    }

    // Function to retrieve the listing fee.
    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    // Function to mint new artwork. Requires the payment of listing fee.
    function mintArtwork(string memory tokenURI, uint256 price) public payable returns (uint) {
        require(msg.value == listingFee, "You gotta pay the gallery fee to list your artwork.");
        require(price > 0, "This piece of art must have value!");
        _tokenIds.increment(); // Incrementing the token ID counter.
        uint256 newTokenId = _tokenIds.current(); // Getting the new token ID.
        _safeMint(msg.sender, newTokenId); // Minting the token.
        _setTokenURI(newTokenId, tokenURI); // Setting the token URI.
        // Creating and mapping the new Artwork struct.
        idToArtwork[newTokenId] = Artwork(newTokenId, payable(address(this)), payable(msg.sender), price, true);
        _transfer(msg.sender, address(this), newTokenId); // Transferring the token.
        return newTokenId;
    }

    // Function to browse listed artworks in the gallery.
    function browseGallery() public view returns (Artwork[] memory) {
        uint itemCount = _tokenIds.current(); // Total number of items minted.
        uint listedItemCount = _tokenIds.current() - _itemsSold.current(); // Number of items currently listed.
        Artwork[] memory items = new Artwork[](listedItemCount); // Array to store listed items.
        uint currentIndex = 0;

        for (uint i = 0; i < itemCount; i++) {
            if (idToArtwork[i + 1].currentlyListed) {
                uint currentId = i + 1;
                Artwork storage currentItem = idToArtwork[currentId];
                items[currentIndex] = currentItem; // Adding the item to the array.
                currentIndex++;
            }
        }
        return items; // Returning the array of listed items.
    }

    // Function to purchase an artwork.
    function purchaseArtwork(uint256 tokenId) public payable {
        uint price = idToArtwork[tokenId].price; // Price of the artwork.
        require(msg.value == price, "The price must be equal to the artwork's listed price.");
        address seller = idToArtwork[tokenId].seller; // Seller's address.
        idToArtwork[tokenId].currentlyListed = false; // Marking the artwork as not listed.
        idToArtwork[tokenId].owner = payable(msg.sender); // Setting the new owner.
        _itemsSold.increment(); // Incrementing the sold items counter.
        _transfer(address(this), msg.sender, tokenId); // Transferring the token to the buyer.
        payable(owner).transfer(listingFee); // Transferring the listing fee to the owner.
        payable(seller).transfer(msg.value); // Transferring the payment to the seller.
    }

    // Function to view the user's collection (both owned and sold items).
    function myCollection() public view returns (Artwork[] memory) {
        uint totalItemCount = _tokenIds.current(); // Total number of items minted.
        uint itemCount = 0; // Counter for items belonging to the user.
        uint currentIndex = 0;

        // Counting items belonging to the user.
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToArtwork[i + 1].owner == msg.sender || idToArtwork[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        Artwork[] memory items = new Artwork[](itemCount); // Array to store the user's items.
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToArtwork[i + 1].owner == msg.sender || idToArtwork[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                Artwork storage currentItem = idToArtwork[currentId];
                items[currentIndex] = currentItem; // Adding the item to the array.
                currentIndex++;
            }
        }
        return items; // Returning the user's collection.
    }
}

```

## Financial Analysis

### Costs for Clients (Users)

1. #### Minting Artwork (`mintArtwork` Function)

- **Cost:** The cost for a client to mint a new artwork is the `listingFee`, set at `0.01 ether`. This fee is mandatory to list the artwork in the gallery. Additionally, users should consider the gas fees required for executing this function on the Ethereum network.

2. #### Purchasing Artwork (`purchaseArtwork` Function)

- **Cost:** The buyer must pay the price of the artwork, as determined by the seller at the time of minting. This price is a fixed amount for each artwork. Gas fees are also applicable for the transaction.

### Potential Earnings or Losses for the Owner

1. #### Minting Artwork

- **Earnings:** The owner earns the `listingFee` (0.01 ether) for each artwork minted and listed. This represents a direct income source.
- **Losses:** There are no direct losses from this function for the owner. However, costs associated with deploying and maintaining the smart contract should be considered.

2. #### Purchasing Artwork

- **Earnings:** For each artwork purchased, the owner earns the `listingFee` again. These fees are the primary revenue source for the owner.
- **Losses:** There are no direct losses from artwork purchases. However, ongoing maintenance and potential updates to the smart contract may incur costs.

3. #### Additional Considerations

- The owner does not receive a percentage of the artwork's sale price; their earnings are solely from the listing fees.
- The contract currently lacks a mechanism for secondary sales or royalties, which could be a potential revenue stream in other NFT platforms.

## Interfaces

### Homepage

![FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/278bb6e5-2cbd-4abd-b8f2-2ad8ba6b4f72)

- **Purpose:** The primary landing page for users to engage with the NFT marketplace.
- **Interactions:** 
  - Explore available NFTs
  - Create new NFTs
  - Connect to MetaMask wallet
  - Subscribe to NFT drop notifications
- **Navigation:** Users can move from the homepage to explore, create, or manage their NFTs and wallet.

### Create New NFT

![Create New NFT FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/cfbc5f39-2ec1-47ee-9ace-238ada7e4785)

- **Purpose:** Allows users to mint new NFTs by providing necessary details.
- **Interactions:** 
  - Input NFT details (title, image, price)
  - Submit to create the NFT
- **Navigation:** Post-creation, users may view their NFTs or return to the marketplace to browse.

### Explore Page

![Explore FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/f704ac15-c705-4570-ad64-f7b96334bd41)

- **Purpose:** Enables users to browse and purchase NFTs in the marketplace.
- **Interactions:** 
  - Place bids or purchase NFTs
- **Navigation:** Users can go on to purchase NFTs or return to the homepage.

### My NFTs

![MyNFTs FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/20a01941-8371-4e16-a583-5117d113ac4d)

- **Purpose:** A personal dashboard for users to view their owned NFTs.
- **Interactions:** 
  - View owned NFTs
- **Navigation:** Access detailed views of owned NFTs or navigate back to explore more NFTs.

### 404 Error Page

![404 FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/3ffb65a2-ed92-49c1-8ae8-a50d4c24839d)

- **Purpose:** Informs users that the page they are trying to access does not exist.
- **Interactions:** 
  - Link to return to the homepage
- **Navigation:** Redirects users back to a functioning part of the website.

## Designs

### Design FullHD
![FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/278bb6e5-2cbd-4abd-b8f2-2ad8ba6b4f72)

### Design for Phone
![Mobile](https://github.com/aBacoding/CryptoKazakh/assets/97093590/b11c1b91-07f8-4a78-bc04-47ba767fa9f3)

### Hamburger menu
![Hamburger Menu](https://github.com/aBacoding/CryptoKazakh/assets/97093590/fca0672f-f922-433a-aeb8-0b20c34a98db)

### Create New NFT FullHD
![Create New NFT FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/cfbc5f39-2ec1-47ee-9ace-238ada7e4785)

### Create New NFT for Phone
![Create New NFT Phone](https://github.com/aBacoding/CryptoKazakh/assets/97093590/fca3b956-9729-4d5c-9097-b734441361d1)

### Explore page FullHD
![Explore FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/f704ac15-c705-4570-ad64-f7b96334bd41)

### Explore page for Phone
![Explore Phone](https://github.com/aBacoding/CryptoKazakh/assets/97093590/7e7b50ea-ec1d-4943-91ae-09bc07d0efec)

### MyNFTs page FullHD
![MyNFTs FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/20a01941-8371-4e16-a583-5117d113ac4d)

### MyNFTs page for Phone
![MyNFTs Phone](https://github.com/aBacoding/CryptoKazakh/assets/97093590/9366f158-5c15-4c7b-87ba-7d91cd6fcb65)

### 404 page FullHD
![404 FullHD](https://github.com/aBacoding/CryptoKazakh/assets/97093590/3ffb65a2-ed92-49c1-8ae8-a50d4c24839d)

### 404 page for Phone
![404 Phone](https://github.com/aBacoding/CryptoKazakh/assets/97093590/6229ca77-316d-4132-a59a-aa1e6fa04ddc)

## Developers

- Abdurakhim Bakytzhan
  - main frontend developer
  - main blockchain developer 
- Temirlan Torebekov
  - main blockchain developer 
- Azat Bekturganov
  - secondary blockchain developer
- Nursultan Tynyshbay
  - secondary frontend developer

## Contributing

Interested in contributing to the CryptoKazakh NFT Marketplace? We welcome contributions of all kinds.

Developed with ❤️ by `Abdurakhim Bakytzhan, Temirlan Torebekov, Azat Bekturganov, Nursultan Tynyshbay/CryptoKazakh Developers Team`
