const { signToken } = require("../helpers/jwt");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const typeDefs = `#graphql
type User {
    _id: ID
    name: String
    username: String
    email: String
    follower : [Follow]
    followerDetail: [all]
    following : [Follow]
    followingDetail: [all]
}

type all {
    _id: ID
    name: String
    username:  String
}

input NewUser {
    name: String!
    username: String!
    email: String!
    password: String!
}

input Login {
    username: String
    password: String
}

type access_token {
    access_token: String
}

type allUser {
    _id: ID
    name: [String]
    username: [String]
    email: [String]
}

type Query {
    users(name: String, username: String): [User]
    userById(id: String): User
}

type Mutation {
    register(user: NewUser): String
    login(login: Login): access_token
}
`;

const resolvers = {
  Query: {
    users: async (_, args, { auth }) => {
      auth();
      let dataUser;
      const { name, username } = args;
      // console.log(name, username, "<<<< ini resolvers");
      if (name) {
        // console.log(name, "<<<<name");
        dataUser = await User.search(name, false);
      } else if (username) {
        // console.log(username, "<<<<username");
        dataUser = await User.search(false, username);
      } else {
        dataUser = await User.getAllUser();
      }
      return dataUser;
    },
    userById: async (_, args, { auth }) => {
      auth();
      let { id } = args;
      console.log(auth().id);
      console.log(id, "<<<ni args id");
      if (!id) {
        id = auth().id;
        console.log(id, "dalam if");
      }
      return await User.getUserById(id);
    },
  },
  Mutation: {
    register: async (_, args) => {
      const newUser = { ...args.user };
      const data = await User.createUser(newUser);
      return "Success Register";
    },
    login: async (_, args) => {
      const dataLogin = { ...args.login };
      // console.log(args);
      let dataByUsername = await User.getByUsername(dataLogin);
      if (!dataByUsername) {
        throw new Error("Username/Password invalid");
      }
      let compare = bcrypt.compareSync(
        dataLogin.password,
        dataByUsername.password
      );
      if (!compare) {
        throw new Error("Username/Password invalid");
      }
      let access_token = signToken(dataByUsername);
      return { access_token };
    },
  },
};

module.exports = { typeDefs, resolvers };
