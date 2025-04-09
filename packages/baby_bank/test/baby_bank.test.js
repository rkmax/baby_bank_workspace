const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BabyBank", function () {
  let babyBank;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const BabyBank = await ethers.getContractFactory("BabyBank");
    babyBank = await BabyBank.deploy();
  });

  describe("Deposits", function () {
    it("Should accept deposits and update balance", async function () {
      const depositAmount = ethers.parseEther("1.0");
      
      await user1.sendTransaction({
        to: await babyBank.getAddress(),
        value: depositAmount,
      });
      
      await babyBank.connect(user1).deposit({ value: depositAmount });
      
      const balance = await babyBank.getBalance(user1.address);
      expect(balance).to.equal(depositAmount);
    });
  });

  describe("Withdrawals", function () {
    it("Should allow withdrawals if balance is sufficient", async function () {
      const depositAmount = ethers.parseEther("2.0");
      const withdrawAmount = ethers.parseEther("1.0");
      
      await babyBank.connect(user1).deposit({ value: depositAmount });
      
      const initialBalance = await ethers.provider.getBalance(user1.address);
      await babyBank.connect(user1).withdraw(withdrawAmount);
      const finalBalance = await ethers.provider.getBalance(user1.address);
      
      // Account for gas costs by checking the balance is higher
      expect(finalBalance).to.be.greaterThan(initialBalance);
    });

    it("Should fail withdrawal if balance is insufficient", async function () {
      const depositAmount = ethers.parseEther("1.0");
      const withdrawAmount = ethers.parseEther("2.0");
      
      await babyBank.connect(user1).deposit({ value: depositAmount });
      
      await expect(
        babyBank.connect(user1).withdraw(withdrawAmount)
      ).to.be.revertedWith("Insufficient balance");
    });
  });
});
