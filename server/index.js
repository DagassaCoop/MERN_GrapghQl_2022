const express = require('express');
const colors = require('colors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/schema');
const connectDB = require('./config/db');

const app = express();

// Connect to DB
connectDB();


app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: process.env.NODE_ENV === 'development',
    schema
}));

app.listen(port, () => console.log(`Server running on port: ${port}`));