const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '487bbc09bc6548dba64da196e71cee77'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Unable to Work With API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(entries => {
  		res.json(entries[0]);
  	})
  	.catch(err => res.status(400).json('Unable to Get Entries'))
	

}

module.exports = {
	handleImage: handleImage,
  handleApiCall: handleApiCall
}