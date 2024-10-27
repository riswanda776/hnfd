require("colors");
const fs = require("fs");
const readlineSync = require("readline-sync");
const { createWallet, createContract } = require("./src/wallet");
const { depositETH } = require("./src/deposit");
const { grow } = require("./src/grow");
const { RPC_URL, displayHeader } = require("./src/utils");
const { JsonRpcProvider } = require("ethers");
const moment = require("moment");
const CONTRACT_ADDRESS = "0xc5bf05cd32a14bffb705fb37a9d218895187376c";

async function main() {
  displayHeader();

  const provider = new JsonRpcProvider(RPC_URL);

  while (true) {
    const action = readlineSync.question(
      "Enter 0 to Deposit, 1 to Open Grow, or 2 to exit: "
    );

    if (action === "2") {
      console.log("Exiting...".cyan);
      break;
    }

    try {
      if (action === "0") {
        const method = readlineSync.question(
          "Enter 0 to use mnemonics, 1 to use private keys: "
        );

        let seedPhrasesOrKeys;
        if (method === "0") {
          seedPhrasesOrKeys = JSON.parse(
            fs.readFileSync("accounts.json", "utf-8")
          );
          if (
            !Array.isArray(seedPhrasesOrKeys) ||
            seedPhrasesOrKeys.length === 0
          ) {
            throw new Error(
              "accounts.json is not set correctly or is empty".red
            );
          }
        } else if (method === "1") {
          seedPhrasesOrKeys = JSON.parse(
            fs.readFileSync("privateKeys.json", "utf-8")
          );
          if (
            !Array.isArray(seedPhrasesOrKeys) ||
            seedPhrasesOrKeys.length === 0
          ) {
            throw new Error(
              "privateKeys.json is not set correctly or is empty".red
            );
          }
        } else {
          throw new Error("Invalid input method selected".red);
        }

        const numDepo = readlineSync.questionInt(
          "How many deposit do you want? "
        );

        for (const keyOrPhrase of seedPhrasesOrKeys) {
          let wallet;
          wallet = createWallet(keyOrPhrase, provider);

          const senderAddress = wallet.address;
          console.log(
            `Processing transactions for address: ${senderAddress}`.cyan
          );

          const contract = createContract(wallet, CONTRACT_ADDRESS);

          await depositETH(contract, numDepo);
        }
      } else if (action === "1") {
        const numOpen = readlineSync.question(
          "How many grow do you want to open?: "
        );

        await grow(numOpen);
      } else {
        console.log(
          "Invalid input. Please enter 0 to Deposit, 1 to Open Grow, or 2 to exit."
            .red
        );
      }
    } catch (error) {
      console.log(
        `[ ${moment().format("HH:mm:ss")} ] Error in main loop: ${
          error.message
        }`.red
      );
    }

    readlineSync.question("Press any key to continue...".cyan);
    displayHeader();
  }
}

main();
