const RPC_URL = 'https://base.llamarpc.com';

function displayHeader() {
  process.stdout.write('\x1Bc');
  console.log('========================================'.cyan);
  console.log('=     Hanafuda Automation     ='.cyan);
  console.log('========================================'.cyan);
  console.log();
}



const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  displayHeader,

  RPC_URL,
  delay,
};
