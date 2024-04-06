require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var { graphqlHTTP } = require("express-graphql");
const cors = require('cors');


const schema = require("./graphql/Schema");
const root = require("./graphql/resolvers");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const DB_CONNECTION_STRING = process.env.MONGODB_URI;

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("Failed to connect to database.", err);
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
  console.log(
    `Express GraphQL Server Now Running On http://localhost:${PORT}/graphql`
  )
);
