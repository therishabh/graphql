import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import dotenv from "dotenv";

import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import connectDB from "./db/connect.js";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      formatError: (err) => {
        return {
          message: err.message,
          code: err.extensions?.code || "INTERNAL_SERVER_ERROR",
          details: err.extensions?.exception?.details || null,
        };
      },
    });

    const { url } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`\n🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("❌ Apollo Server Error:", error);
  }
};

startServer();
