// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title BabyBank
 * @dev A simple bank contract that allows deposits, withdrawals, and balance checking
 */
contract BabyBank {
    // Mapping of account addresses to their balances
    mapping(address => uint256) private balances;
    
    // Events
    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);
    
    /**
     * @dev Deposit funds into the bank
     */
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    /**
     * @dev Withdraw funds from the bank
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) public {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
        
        emit Withdrawal(msg.sender, amount);
    }
    
    /**
     * @dev Get the balance of an account
     * @param account Address of the account
     * @return The balance of the account
     */
    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }
    
    /**
     * @dev Get your own balance
     * @return Your balance
     */
    function myBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
    
    /**
     * @dev Get the total balance of the bank
     * @return The total balance of the bank
     */
    function getTotalBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
