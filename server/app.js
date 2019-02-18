const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
var Chance = require('chance');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var chance = new Chance();

const testPayload = new Array(5).fill().map(function() {
  return {
    id: chance["cf"](),
    name: chance["first"](),
    location: chance["city"](),
    currency: chance["prime"](),
  };
});
let data = {
  "offset": {
    "start": "0",
    "end": "5"
  },
  "searchString": "",
  "total": 228,
  "newCurerncy": "",
  "count": 10000000,
  "perPage": 5, 
  "sortBy": "",
  "order": "",
  "payload": testPayload
};

app.get('/', (req, res) => {
  res.send(data);
});

app.post('/', (req, res) => {
  
  const oldSearchString = data.searchString;
  data = req.body;

  if(oldSearchString !== req.body.searchString) {
    const randomCurrency = chance.prime();
    data.total = randomCurrency;
  };
  
  const newCurerncy = req.body.newCurerncy;
  if(typeof newCurerncy === 'object') {
    const randomCurrency = chance.prime();
    data.total = randomCurrency;
  };

  const perPage = Number(req.body.perPage);
  const testData = new Array(perPage).fill().map(function() {
    return {
      id: chance["cf"](),
      name: chance["first"](),
      location: chance["city"](),
      currency: chance["prime"](),
    };
  });
  data.payload = testData;

  res.send(data);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
