const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express4");
const { connectRedis } = require("./config/redisClient");


require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  await connectRedis();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
