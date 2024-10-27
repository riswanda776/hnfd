const { Wallet, Contract } = require('ethers');
const { ABI } = require('./abi');

function createWallet(privateKey, provider) {
  return new Wallet(privateKey, provider);
}

function createContract(wallet, contractAddress) {
  return new Contract(contractAddress, ABI, wallet);
}

module.exports = {
  createWallet,
  createContract,
};
