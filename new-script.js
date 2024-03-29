require('dotenv').config();
const opensea = require("opensea-js");
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const HDWalletProvider = require("@truffle/hdwallet-provider");
const args = require('yargs').argv;
const getOrder = require('./getorderblob')


const providerUrl = process.env.PROVIDER_URL; // "https://api.zmok.io/mainnet/637zzh0pyyopztwz"
var extraGas = args.extraGas; // add extra gas to current gas price

const walletAddress=process.env.WALLET_ADDRESS;
const walletPrivateKey=process.env.WALLET_PRIVATE_KEY;
const openSeaApiKey=process.env.OPENSEA_API_KEY; // API key is required

if (!walletAddress || !walletPrivateKey || !openSeaApiKey || !providerUrl) {
  console.error("Missing .env variables!");
  return;
}

if (!args.extraGas) {
  extraGas = 0
}

if (!args.startTimeUTC) {
  [hour, minute, second] = [0, 0, 0]
} else {
  hour = parseInt(args.startTimeUTC.replace(/:.*/, ""))
  re = /:(\d+):/
  minute = parseInt((re.exec(args.startTimeUTC))[1]);
  second = parseInt(args.startTimeUTC.replace(/.*:/, ""));
}
const providerEngine = new HDWalletProvider(walletPrivateKey, providerUrl)

const seaport = new OpenSeaPort(
  providerEngine, {
    networkName: Network.Main,
    apiKey: openSeaApiKey,
  },
  (arg) => console.log(arg, 'sdhjsjdjsdjhjs')
);

// If the order is a sell order (order.side === OrderSide.Sell), the taker is the buyer and this will prompt
// the buyer to pay for the item(s) but send them to the recipientAddress.
// If the order is a buy order ( OrderSide.Buy), the taker is the seller but the bid amount be sent to the recipientAddress.
async function main() {
  console.log("Start...");
  const order = await getOrder('5250536420') // Change this according to order id you want to buy
  console.log(order)
  const transactionHash = await seaport.fulfillOrder({ //Fulfilling order
    order,
    accountAddress: walletAddress,
  });
  console.log("transactionHash: " + transactionHash);
  console.log("Finish...");
  return;
};

// Setting up a launch timeout
var now = new Date()
var t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 10).getTime()
currentTime = new Date().getTime()
timeo = t - Date.now();
setTimeout(main, Math.max(timeo, 0))