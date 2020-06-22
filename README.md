# vercel-mongo-test

## Examples
`curl -X POST -v "http://localhost:3000/api/survey.js" -H 'Content-Type: application/json' -d '{"userId":100,"surveyId":100,"answer":"test","dateTime":"test","type":"test"}'`

`curl -v "http://localhost:3000/api/deletetest.js"`

## Tips
* To use MongoDB with Node.js, follow the example in insert.js. `npm i mongodb` and then `node insert.js` (export MONGO_USERNAME MONGO_PASSWORD and MONGO_HOST to environment first)

* To view database content, can use any Mongo CLI or GUI tools. If using MongoDB Compass Community (it's "official") make sure the connection address is like `mongodb://USERNAME:PASSWORD@34.69.167.253:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false&authSource=admin`. Make sure to include "authSource=admin"

* Command for entering Mongo shell: `mongo -host $MONGO_HOST -u $MONGO_USERNAME -p $MONGO_PASSWORD`

* Mongo database server is hosted on Google Cloud Compute Engine. Current IP is 34.69.167.253. It might change after restarting. Database port is 27017.

* On the Google Cloud machine, make sure `mongod` process is running. Check it via `sudo systemctl status mongod`

## Resources
[Vercel create Node.js API with MongoDB](https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel)

[Routing API functions in Vercel](https://vercel.com/guides/migrate-to-vercel)
