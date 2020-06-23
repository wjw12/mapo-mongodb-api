/*
Usage:

GET
{
  userId: Long,
  (optional) latentVec: List of Float, (if present, return a sequence at the nearest latent space point)
  (optional) random: Boolean, (if true, return a sequence at random latent space)
}

*/

const getLatent = require('getLatent.js');
const constant = require('constant.js');

module.exports = async (req, res) => {
  const {body} = req;
  if (!body || !body.userId) {
    res.status(400).send("Bad request");
    return;
  }

  if (body.random) {
    let z = [];
    for (let i = 0; i < constant.LATENT_DIM; ++i) {
      z.push(Math.random() * (constant.Z_MAX - constant.Z_MIN) + constant.Z_MIN);
    }
    let result = await getLatent(z);
    if (result) {
      res.status(200).json(result);
      return;
    }
  }
  else if (body.latentVec) {
    let result = await getLatent(body.latentVec);
    if (result) {
      res.status(200).json(result);
      return;
    }
  }

  res.status(400).send('');
}