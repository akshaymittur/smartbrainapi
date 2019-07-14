const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '26aeb4fd18d14c57a7e9ee59c4ac8a93'
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