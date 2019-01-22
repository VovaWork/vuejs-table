const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const testData = require('../src/data/test.json');
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const data = {
  "searchString": "",
  "total": 228,
  "count": 10000000,
  "perPage": 5, 
  "sortBy": "name",
  "order": "asc",
  "payload": testData.payloadMain
};

app.get('/', (req, res) => {
  data.total = 228;
  data.count = 10000000;
  data.payload = testData.payloadMain;

  res.send(data);
});

app.post('/searchString', (req, res) => {
  console.log(req.body.searchString);
  data.total = 3244;
  data.count = 155370;
  data.payload = testData.payloadSearch;

  res.send(data)
});

app.post('/itemsNumber', (req, res) => {
  console.log(req.body.perPage);
  data.payload = testData.payloadFiveItems;

  res.send(data);
});

app.post('/sortBy', (req, res) => {
  console.log(`${req.body.range.start} ${req.body.range.end} ${req.body.sortBy} ${req.body.order}`);
  data.payload = testData.payloadSort;

  res.send(data);
});

app.post('/recalculateTotal', (req, res) => {
  console.log(req.body.newCurerncy);
  res.send({total: 700}); 
});

app.post('/pageChange', (req, res) => {
  console.log(`${req.body.range.start} ${req.body.range.end}`);

  res.send(data);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
