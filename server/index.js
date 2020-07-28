const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');

//connect mongodb
const connect = mongoose.connect(process.env.NODE_ENV === 'development' ? 'mongodb://localhost:27017/react-data' : process.env.MONGO_URI, { useNewUrlParser: true });
connect.then((db) => {
      console.log('Connected correctly to server!');
}, (err) => {
      console.log(err);
});

//create appolo server
const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

const app = express();
//using the  application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('*',cors());

server.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
    console.log(`Listening to requests on ${process.env.PORT}`);
  });