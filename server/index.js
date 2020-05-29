const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const routes = require('./routes');

//using the  application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/api', routes);




app.listen(process.env.PORT, () => {
    console.log(`Listening to requests on ${process.env.PORT}`);
  });