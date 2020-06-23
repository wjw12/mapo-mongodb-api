// not an API
// just showing how to use MongoDB with Node.js

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + ":27017/lsd?authSource=admin";

main();

async function main() {
    const db = await MongoClient.connect(url);
    const dbo = db.db('lsd');
    var col = dbo.collection('test');
    var batch = col.initializeUnorderedBulkOp();
    var toInsert = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
                console.log(i,j);
                var myobj = {
                  "i": i,
                  "j": j, 
                  "type":'test'};
  
                toInsert.push(myobj);
                
                batch.insert(myobj);
                const lastItem = i == 9 && j == 9;
                if (lastItem || toInsert.length > 10) {
                  await batch.execute();
                  batch = col.initializeUnorderedBulkOp();
                  console.log('inserted');
                  toInsert = [];
                }
                
        }
    }
    
    db.close();
}

