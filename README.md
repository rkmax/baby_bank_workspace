# Baby Solidity Apps

This repository contains simple Solidity smart contracts for educational purposes:

- **BabyBank**: A basic banking contract that allows deposits and withdrawals
- **BabyWallet**: A simple wallet contract for sending and receiving ETH

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   yarn install
   ```

3. Compile the contracts:
   ```
   yarn run compile
   ```

4. Run tests:
   ```
   yarn run test
   ```

5. Deploy to local network:
   - Start a local Hardhat node:
     ```
     npx hardhat node
     ```
   - Deploy contracts:
     ```
     yarn run deploy-local
     ```

## Contracts

### BabyBank

The BabyBank contract offers basic banking functionalities:
- Deposit ETH
- Withdraw ETH
- Check balances

### BabyWallet

The BabyWallet contract offers simple wallet functionalities:
- Receive ETH
- Send ETH (only owner)
- Change wallet owner

## License

MIT
