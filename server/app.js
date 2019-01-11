const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const data = {
    "searchString": "",
    "total": 228,
    "count": 10000000,
    
    "perPage": 5, 
    "sortBy": "name",
    "order": "asc",
    "payload": [
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      },
      {
        "id": "218367812",
        "name": "sdfhkj",
        "location": "sdfhkj",
        "currency": "32678"
      }
    ]

  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(data));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
