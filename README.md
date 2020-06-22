# vercel-mongo-test

## Tips
* To use MongoDB with Node.js, follow the example in insert.js. `npm i mongodb` and then `node insert.js` (export MONGO_USERNAME MONGO_PASSWORD and MONGO_HOST to environment first)

* Command for entering Mongo shell: `mongo -host $MONGO_HOST -u $MONGO_USERNAME -p $MONGO_PASSWORD`

* Mongo database is hosted on Google Cloud Compute Engine. Current IP is 34.69.167.253. It might change after restarting. Database port is 27017.

* On the Google Cloud machine, make sure `mongod` process is running. Check it via `sudo systemctl status mongod`

## Resources
[Vercel create Node.js API with MongoDB](https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel)

