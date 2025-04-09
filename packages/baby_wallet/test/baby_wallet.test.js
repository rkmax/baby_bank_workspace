const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BabyWallet", function () {
  let babyWallet;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const BabyWallet = await ethers.getContractFactory("BabyWallet");
    babyWallet = await BabyWallet.deploy();
  });

  describe("Ownership", function () {
    it("Should set the owner correctly during deployment", async function () {
      expect(await babyWallet.owner()).to.equal(owner.address);
    });

    it("Should allow owner to change ownership", async function () {
      await babyWallet.changeOwner(user1.address);
      expect(await babyWallet.owner()).to.equal(user1.address);
    });

    it("Should not allow non-owner to change ownership", async function () {
      await expect(
        babyWallet.connect(user1).changeOwner(user2.address)
      ).to.be.revertedWith("Only the owner can call this function");
    });
  });

  describe("Funds Management", function () {
    it("Should accept direct transfers", async function () {
      const transferAmount = ethers.parseEther("1.0");
      
      await owner.sendTransaction({
        to: await babyWallet.getAddress(),
        value: transferAmount,
      });
      
      expect(await babyWallet.getBalance()).to.equal(transferAmount);
    });

    it("Should allow owner to send funds", async function () {
      const transferAmount = ethers.parseEther("1.0");
      
      await owner.sendTransaction({
        to: await babyWallet.getAddress(),
        value: transferAmount,
      });
      
      const initialBalance = await ethers.provider.getBalance(user1.address);
      await babyWallet.send(user1.address, transferAmount);
      const finalBalance = await ethers.provider.getBalance(user1.address);
      
      expect(finalBalance - initialBalance).to.equal(transferAmount);
    });

    it("Should not allow non-owner to send funds", async function () {
      const transferAmount = ethers.parseEther("1.0");
      
      await owner.sendTransaction({
        to: await babyWallet.getAddress(),
        value: transferAmount,
      });
      
      await expect(
        babyWallet.connect(user1).send(user2.address, transferAmount)
      ).to.be.revertedWith("Only the owner can call this function");
    });
  });
});
