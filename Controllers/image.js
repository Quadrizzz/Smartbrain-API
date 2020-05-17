const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'a9a9df37645c428892515d135fc35d75'
   });

const handleAPICall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err=> {
        res.status(400).json("Can't work with API")
    })
}

const handleImage = (req,res,db)=>{
    const { id } = req.body;
    db('users').where('id' ,'=' ,id)
    .increment('entrie' , 1)
    .returning('entrie')
    .then(entrie => {
        res.json(entrie[0]);
    })
    .catch(err => res.status(400).json('unable to get count or entries'))
}

module.exports = {
    handleImage : handleImage,
    handleAPICall : handleAPICall
}