import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "./generated/prisma";
import resolvers from "./resolvers";
import middwre from "./middleware/checkuser";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

// import typeDefs from "./schema.graphql";
const typeDefs = importSchema("src/schema/schema.graphql");

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
      debug: true // log all GraphQL queries & mutations sent to the Prisma API
      // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
    })
  })
});

server.express.post(server.options.endpoint, (req, res, next) => {
  middwre.checkuser(req, res, next);
});

server.start(() => {
  console.log(`Server is running`);
});
