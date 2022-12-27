import Clarifai from 'clarifai';



const app = new Clarifai.App({
    apiKey: "218a63a5cadb41e68b398a7450fcf76f",
  });

  const handleImageUrl = (req, res) => {
  app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  }

const handleImage = (req, res,db) => {
const { id } = req.body;
db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    }).catch(err => {
        res.status(400).json('something went wrong')
    })
}

export{handleImage}
export{handleImageUrl}