import dataSource from "./utils";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { join } from "path";

// Start Server
const start = async (): Promise<void> => {
  await dataSource.initialize();

  const path = join(__dirname, "./resolvers/*Resolver.ts");
  const schema = await buildSchema({
    resolvers: [path],
  });
  const server = new ApolloServer({
    schema,
  });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};

void start();
