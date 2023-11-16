# CryptoKazakh
Welcome to the GitHub repository of CryptoKazakh, a unique digital marketplace designed to foster global appreciation and preservation of Kazakh culture. This decentralized application (dApp) leverages blockchain technology to provide a platform for artists and cultural enthusiasts to buy, sell, and explore Kazakh-themed Non-Fungible Tokens (NFTs).

## CryptoKazakh NFT Marketplace

Welcome to our CryptoKazakh NFT Marketplace where users can create, buy, sell, and interact with a wide range of digital artworks and collections.

## Table of Contents
1. [Create, Buy and Sell the Best NFTs!](#create-buy-and-sell-the-best-nfts)
2. [Live Auctions](#live-auctions)
3. [How It Works](#how-it-works)
4. [Popular Collections](#popular-collections)
5. [Explore By Categories](#explore-by-categories)
6. [Top Creators](#top-creators)
7. [Ready for Next NFT Drop?](#ready-for-next-nft-drop)
8. [Footer Logo and Copyright Text](#footer-logo-and-copyright-text)

---

### Create, Buy and Sell the Best NFTs!
- **Purpose**: This is the main landing or hero section of the website, introducing the primary objective of the platform: to create, buy, and sell NFTs.
- **User Interactions**: 
  - "Explore" button: To view more artworks and auctions.
  - "Create" button: Start the process of creating or minting new NFTs.
  - "Start Bid" button on the featured NFT: Begin the bidding process for a particular NFT.
- **Expected User Flow**: Users can either delve deeper into the platform by clicking "Explore" or start their NFT creation process. If they're interested in the featured NFT, they can directly start bidding.

### Live Auctions
- **Purpose**: Display live auctions where users can view ongoing bids and participate.
- **User Interactions**: 
  - Click on individual NFTs: View detailed information and artist profile.
  - "Place a bid" button: Engage in the bidding for a particular NFT.
- **Expected User Flow**: Users can explore ongoing auctions, and if interested, click on an NFT to know more or directly place a bid.

### How It Works
- **Purpose**: A step-by-step guide on how the platform operates, helping newcomers understand the process.
- **User Interactions**: 
  - Icons & Text: Provides a visual representation and brief explanation of each step.
- **Expected User Flow**: Users, especially newcomers, can familiarize themselves with the platform's workings before diving deeper.

### Popular Collections
- **Purpose**: Showcase the trending and most popular NFT collections on the platform.
- **User Interactions**: 
  - Click on individual collections: View detailed information and associated NFTs.
- **Expected User Flow**: Users can browse through popular collections and explore NFTs within those collections.

### Explore By Categories
- **Purpose**: Allow users to explore NFTs based on different categories, streamlining their browsing experience.
- **User Interactions**: 
  - Click on a category: View NFTs associated with that category.
- **Expected User Flow**: Users can narrow down their exploration by selecting a specific category of interest.

### Top Creators
- **Purpose**: Highlight and promote the top creators on the platform based on their contributions.
- **User Interactions**: 
  - Click on individual creator profiles: View their artworks, profile details, and history.
- **Expected User Flow**: Users can discover renowned artists on the platform and explore their creations.

### Ready for Next NFT Drop?
- **Purpose**: Engage users in upcoming events or NFT drops by capturing their email for newsletters.
- **User Interactions**: 
  - This section is for users to receive the next drop nft on the entered mail.
- **Expected User Flow**: The user might glance at the logo or copyright information, recognizing the brand or ensuring the site's legitimacy. There's no further action required from the user in this section.

### Footer Logo and Copyright Text
- **Purpose**: The very bottom of the page provides branding for the platform and offers essential legal information.

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

### Features to Implement

1. **Reentrancy Guard**: Protect sensitive functions like `purchaseArtwork` using OpenZeppelin's `ReentrancyGuard` to prevent reentrancy attacks.

2. **Withdraw Function**: Implement a `withdraw` function to allow safe withdrawal of funds, providing better security and owner control.

3. **Events**: Emit events for all state changes such as successful purchases and listing fee updates to ensure transparency and traceability.

4. **Access Control**: Utilize OpenZeppelin's `Ownable` contract to secure owner-only functions.

5. **Error Messages**: Include descriptive error messages in all `require` statements for better debugging and user experience.

6. **Function Modifiers**: Implement function modifiers for recurring requirements to simplify the code and enhance readability.

## Function Demonstration

To demonstrate the functions and handle incorrect inputs, testing frameworks like Hardhat or Truffle should be used. Here's how the contract should behave with incorrect inputs:

- `updateListingFee`: Should revert if called by anyone other than the owner.
- `mintArtwork`: Should revert if the sent value is less than the listing fee or if the price is set to zero.
- `purchaseArtwork`: Should revert if the sent value does not match the artwork's price or if the artwork is not listed.

## Parameter Validation

The contract should validate inputs using:

- Modifiers for common checks.
- `assert` for invariants that should always be true.
- Additional checks for edge cases, such as token ID validity or price ranges.

## Financial Analysis

### Cost Incurred by Clients

- **Minting Artwork**: Clients pay the gas fee and the listing fee.
- **Purchasing Artwork**: Clients pay the artwork price and the gas fee.

### Potential Earnings or Losses for the Owner

- **Listing Fee**: Earned each time artwork is minted.
- **Purchase Artwork**: No direct earnings unless a sale fee is implemented.
- **Update Listing Fee**: Indirect impact on earnings by affecting the attractiveness of the listing.

### Potential Losses

- Loss of potential earnings if the contract fails to attract users.
- Loss of control or funds if there are bugs or security flaws.

## Gas Optimization

- Monitor and optimize contract functions for gas usage.
- Use `view` and `pure` functions to reduce gas costs for read-only external calls.

## Deployment and Testing

Deploy the contract to a test network and interact with it using a wallet with test ether. Document the gas used for each function and calculate costs based on current gas prices.
