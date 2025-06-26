import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // ✅ Change if your backend port is different
  cache: new InMemoryCache(),
});

export default client;
