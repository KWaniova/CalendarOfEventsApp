import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas";

const app: Express = express();
const PORT = 5888;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server is running.");
});
