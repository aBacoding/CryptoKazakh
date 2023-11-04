// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrendingItems {
    address public owner;
    uint256 public itemCount = 0;

    struct Item {
        uint256 id;
        string title;
        string imageUrl;
        string authorImageUrl;
        string author;
        uint256 price; // price in Wei
        bool isSold;
    }

    mapping(uint256 => Item) public items;

    event ItemListed(
        uint256 indexed id,
        string title,
        string imageUrl,
        string author,
        uint256 price
    );

    event ItemPurchased(
        uint256 indexed id,
        address indexed buyer,
        uint256 price
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function listItem(
        string memory _title,
        string memory _imageUrl,
        string memory _authorImageUrl,
        string memory _author,
        uint256 _price
    ) public onlyOwner {
        items[itemCount] = Item(
            itemCount,
            _title,
            _imageUrl,
            _authorImageUrl,
            _author,
            _price,
            false
        );
        itemCount++;
        emit ItemListed(itemCount, _title, _imageUrl, _author, _price);
    }

    function purchaseItem(uint256 _id) public payable {
    Item storage item = items[_id];
    require(!item.isSold, "Item already sold"); // Corrected this line
    require(msg.value == item.price, "Incorrect price");

    item.isSold = true;
    payable(owner).transfer(msg.value);
    emit ItemPurchased(_id, msg.sender, msg.value);
}

}