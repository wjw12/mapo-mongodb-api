/*
Usage:

POST
{
  userId: Long,
  sequence: String, (contains the drawing sequence in arbitrary format)
  dateTime: Date
}

*/

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
  const {body} = req;
  if (!body) return;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  var collection;

  if (body.type == 'test') collection = await db.collection('test');
  else collection = await db.collection('survey');

  if (body.userId && body.dateTime && body.sequence) {
    if (body.sequence.length < 10) {
      res.status(400).send("Sequence too short");
    }
    else {
      collection.insertOne(body, (err, obj) => {
        if (err) res.status(400).json({err});
        else res.status(200).send("Success");
        });
      }
  }
  else {
    res.status(400).send("Wrong format");
  }
}
