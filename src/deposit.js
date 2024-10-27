const moment = require("moment");
const { delay } = require("./utils");
const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();
const token = process.env.TOKEN;

async function depositETH(contract, numClaims) {
  const url =
    "https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql"; // Replace with the actual GraphQL endpoint URL

  for (let i = 0; i < numClaims; i++) {
    try {
      const depositAmount = ethers.parseEther("0.00000001");

      const responseContract = await contract.depositETH({
        value: depositAmount,
      });

      if (responseContract.hash) {
        const payload = {
          query:
            "mutation SyncEthereumTx($chainId: Int!, $txHash: String!) {\n  syncEthereumTx(chainId: $chainId, txHash: $txHash)\n}",
          variables: {
            chainId: 8453,
            txHash: responseContract.hash,
          },
          operationName: "SyncEthereumTx",
        };

        await delay(6000);
        const response = await axios.post(url, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.statusCode == 200 || 201) {
          console.log(
            `[ ${moment().format(
              "HH:mm:ss"
            )} ] Successfully deposit for address ${responseContract.from}`
              .green
          );
        }

        console.log(
          `[ ${moment().format(
            "HH:mm:ss"
          )} ] Check your hash here: https://basescan.org/tx/${
            responseContract.hash
          }`.green
        );
      }
      await delay(10000);
    } catch (error) {
      console.log(
        `[ ${moment().format("HH:mm:ss")} ] Error : ${error.message}`.red
      );
    }
  }
}

module.exports = {
  depositETH,
};
