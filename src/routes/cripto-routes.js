const router = require('express').Router();
const Cripto = require('../models/Cripto');

// post route
router.post('/', async (req, res) => {
  // treat body from request
  const cripto = req.body;

  if (!cripto.name) {
    res.status(422).send({ error: 'Cripto not found!' });
  }

  try {
    // create cripto with moongose
    await Cripto.create(cripto);
    res.status(201).json({ message: 'Cripto created!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get route
router.get('/', async (req, res) => {
  try {
    // get criptos with moongose
    const criptos = await Cripto.find();
    res.status(200).json(criptos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get dynamic route
router.get('/:name', async (req, res) => {
  // extract the data from request, pela url = req.params
  const name = req.params.name;
  try {
    const cripto = await Cripto.findOne({ name: name });
    res.status(200).json(cripto);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// update with patch
router.patch('/:id', async (req, res) => {
  const criptoId = req.params.id;
  const criptoBody = req.body;
  
  try {
    const updatedCripto = await Cripto.updateOne({ _id: criptoId }, criptoBody);
    if (updatedCripto.matchedCount === 0) {
      res.status(422).send({ message: 'Cripto not found!' });
      return;
    }
    res.status(200).json(criptoBody);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// delete
router.delete('/:id', async (req, res) => {
  const criptoId = req.params.id;
  try {
    await Cripto.deleteOne({ _id: criptoId });
    res.status(200).json({ message: 'Cripto Removed' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;