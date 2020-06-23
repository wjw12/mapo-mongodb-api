const url = require('url')
const MongoClient = require('mongodb').MongoClient

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

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = await db.collection('test')

  const query = {type: 'test'}

  collection.deleteMany(query, (err, obj) => {
    if (err) {
    res.status(200).json({err})
    }   
 
    res.status(200).json({number: obj.result.n})
  })
}
