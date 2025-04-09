// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BabyWallet
 * @dev A simple wallet contract that can send and receive ETH
 */
contract BabyWallet {
    address public owner;
    
    // Events
    event Received(address indexed sender, uint256 amount);
    event Sent(address indexed recipient, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    // Modifier to check if the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    /**
     * @dev Fallback function to receive ETH
     */
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    
    /**
     * @dev Send ETH from the wallet to a recipient
     * @param recipient Address of the recipient
     * @param amount Amount to send
     */
    function send(address payable recipient, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient balance");
        
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Sent(recipient, amount);
    }
    
    /**
     * @dev Change the owner of the wallet
     * @param newOwner Address of the new owner
     */
    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
    
    /**
     * @dev Get the balance of the wallet
     * @return The balance of the wallet
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
