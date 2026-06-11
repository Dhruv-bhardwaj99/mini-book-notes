const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express4");
const { connectRedis } = require("./config/redisClient");
const verifyFirebaseToken = require("./middleware/authMiddleware");
const connectDB = require("./config/database");

require("dotenv").config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  await connectDB();
  await connectRedis();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(verifyFirebaseToken);

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: req.user,
      }),
    }),
  );

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`GraphQL running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
