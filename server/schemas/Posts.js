const { ObjectId } = require("mongodb");
const redis = require("../config/redis");
const Posts = require("../models/Posts");

const typeDefs = `#graphql 

type Posts {
    _id: ID 
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    author: User
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
}

type Comments {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
}

type Likes {
    username: String!
    createdAt: String
    updatedAt: String
}

input AddPosts {
    content: String
    tags: [String]
    imgUrl: String
}

type newPosts {
    content: String
    tags: [String]
    imgUrl: String
}

type Query {
  posts(id: String): [Posts]
  # postById(id: String): Posts
}

type Mutation{
    addPosts(addPosts: AddPosts): newPosts
    addComments(content: String, postId: ID) : Comments
    addLikes(postId: ID): String
}
`;

const resolvers = {
  Query: {
    posts: async (_, args, { auth }) => {
      // auth()
      const { id } = args;
      console.log(args);
      const postsCache = await redis.get("posts:all")
      if (postsCache) {
        // console.log("ini dari postscache");
        return JSON.parse(postsCache)
      }
      let dataPosts = await Posts.getAllPosts(id);
      await redis.set("posts:all", JSON.stringify(dataPosts))
      return dataPosts;
    },
  },
  Mutation: {
    addPosts: async (_, args, { auth }) => {
      const { id, username } = auth();
      // console.log(id, username);
      // tambahin id pas create
      const { content, tags, imgUrl } = args.addPosts
      const newPosts = { ...args.addPosts };
      let data = await Posts.addNewPosts({ content, tags, imgUrl, authorId: new ObjectId(String(id)) });
      await redis.del("posts:all")
      return newPosts;
    },
    addComments: async (_, args, contextValue) => {
      const { content, postId } = args;
      const { username } = contextValue.auth();
      const result = await Posts.addComments({ content, username }, postId);
      await redis.del("posts:all")
      return { content };
    },
    addLikes: async (_, args, { auth }) => {
      const { postId } = args;
      const { username } = auth();
      const result = await Posts.addLikes({ username }, postId);
      await redis.del("posts:all")
      return "Success like this post";
    }
  },
};

module.exports = { typeDefs, resolvers };
