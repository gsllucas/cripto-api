const mongoose = require('mongoose');

const cripto = {
  name: String,
  tag: String,
  currencyValue: String,
  lastRate: String,
  rank: Number,
  type: String,
  watchListCount: Number,
  isFavorite: Boolean,
  graph: String,
  scenarios: [
    {
      scenario: String,
      value: String,
      rate: String,
    },
  ],
};

const Cripto = mongoose.model('Cripto', cripto);

module.exports = Cripto;