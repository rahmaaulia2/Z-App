const Follow = require("../models/Follow");

const typeDefs = `#graphql
type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
},
type Query {
    follow: [Follow]
},
type Mutation {
    addFollow(followingId: String): String
}
`;

//yang di follow = following => id teman ada di id yg login
//yang nge follow = follower => id yg login ada di yg teman
const resolvers = {
  Query: {
    follow: async (_, args, { auth }) => {
      return await Follow.getAllFollowing();
    }
  },
  Mutation: {
    addFollow: async (_, args, {auth})=>{
        const {id, username} = auth()
        const {followingId} = args
        let data = await Follow.addFollow(followingId, id)
        return ("Success follow")
    }
  }
};

module.exports = { typeDefs, resolvers };
