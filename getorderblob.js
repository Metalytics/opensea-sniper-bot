require('dotenv').config();
const pg = require('pg');

const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const orderBlob = async (opensea_listings_id) => {
  
  try {
    client.connect();
    const query = `select * from listings_entity le where opensea_listings_id = '${opensea_listings_id}'`;
    console.log(query)
    const resp = await client.query(query);
    const orders = {
      "hash": resp.rows[0].order_hash,
      "cancelledOrFinalized": false,
      "markedInvalid": false,
      "metadata": {
        "asset": {
          "id": resp.rows[0].assettokenid,
          "address": resp.rows[0].contract_address
        },
        "schema": "ERC721"
      },
      "waitingForBestCounterOrder": false,
      "quantity": resp.rows[0].quantity,
      "exchange": resp.rows[0].exchange,
      "makerAccount": JSON.parse(resp.rows[0].maker),
      "takerAccount": JSON.parse(resp.rows[0].taker),
      "maker": JSON.parse(resp.rows[0].maker).address,
      "taker":JSON.parse(resp.rows[0].taker).address,
      "makerRelayerFee":resp.rows[0].makerRelayerFee,
      "takerRelayerFee":resp.rows[0].takerRelayerFee,
      "makerProtocolFee":resp.rows[0].makerProtocolFee,
      "takerProtocolFee":resp.rows[0].takerProtocolFee,
      "makerReferrerFee": "0",
      "waitingForBestCounterOrder": false,
      "feeMethod": Number(resp.rows[0].feeMethod),
      "feeRecipientAccount": JSON.parse(resp.rows[0].feeRecipient),
      "feeRecipient":  JSON.parse(resp.rows[0].feeRecipient).address,
      "side": Number(resp.rows[0].side),
      "saleKind": 0,
      "target":resp.rows[0].target,
      "howToCall": Number(resp.rows[0].howToCall),
      "calldata":resp.rows[0].calldata,
      "replacementPattern":resp.rows[0].replacementPattern,
      "staticTarget":resp.rows[0].staticTarget,
      "staticExtradata":resp.rows[0].staticExtradata,
      "paymentToken": resp.rows[0].paymentToken,
      "basePrice":resp.rows[0].basePrice,
      "extra":resp.rows[0].extra,
      "currentBounty":resp.rows[0].current_bounty,
      "currentPrice":resp.rows[0].current_price,
      "createdTime":resp.rows[0].created_time,
      "listingTime":resp.rows[0].listingTime,
      "expirationTime":resp.rows[0].expirationTime,
      "salt":resp.rows[0].salt,
      "v": Number(resp.rows[0].v),
      "r":resp.rows[0].r,
      "s":resp.rows[0].s,
    }
    client.end();
    return orders;
  } catch (e) {
    console.log(e);
  }
}

module.exports = orderBlob;