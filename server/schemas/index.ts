import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
} from "graphql";
import UserType from "./types/user_type";
import userData from "../store/user_data";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return userData; // dane zwracane z bazy
      },
    },
    userByID: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(_parent, args) {
        return userData.find((item) => item.id === args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_parent, args) {
        userData.push({ id: userData.length + 1, ...args });
        return args;
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
