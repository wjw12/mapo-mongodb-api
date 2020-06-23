/*
  params: n-dimensional latent vector z, whose dimension and range is defined as constants
  return: a database entry containing sequence generated from latent space {dx: [...], dy: [...]}
*/

const url = require('url')
const MongoClient = require('mongodb').MongoClient
const constant = require('./constant.js')

let cachedDb = null

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb
  }
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  const db = await client.db(url.parse(uri).pathname.substr(1))
  cachedDb = db
  return db
}

module.exports = async (z) => {
  if (!z || z.length != constant.LATENT_DIM) {
    return null;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('style_data');

  let index = 0;
  let query = {}
  for (let dim = 0; dim < constant.LATENT_DIM; dim++) {
    let x = Math.floor((z[dim] - constant.Z_MIN) / (constant.Z_MAX - constant.Z_MIN) * constant.GRID)
    index = Math.max(Math.min(x, constant.GRID - 1), 0);
    query["dim_" + dim.toString()] = index;
  }

  const data = await collection.findOne(query);
  return data;
}
