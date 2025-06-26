import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import cors from "cors";
import { connectDB, getDb } from "./db.js";

const app = express();
const PORT = 4000;

const db = await connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async () => ({ db }),
  })
);

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
);
