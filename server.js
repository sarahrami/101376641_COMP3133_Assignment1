require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const cors = require('cors');

const schema = require("./graphql/Schema");
const root = require("./graphql/resolvers");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const MONGODB_URI = "mongodb+srv://sarahrami97:rKcXzEa3p234lbya@cluster0.umsf83y.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Failed to connect to the database.", err);
    process.exit();
  });

const PORT = 4000;
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () =>
  console.log(`Express GraphQL Server Now Running On http://localhost:${PORT}/graphql`)
);
