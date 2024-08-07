require('dotenv').config()
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const {
    typeDefs : userTypeDefs, resolvers : userResolvers 
} = require("./schemas/User")

const {
    typeDefs : postsTypeDefs, resolvers : postsResolvers 
} = require("./schemas/Posts");

const {
  typeDefs : followTypeDefs, resolvers : followResolvers 
} = require("./schemas/Follow");

const { verifyToken } = require("./helpers/jwt");

const server = new ApolloServer({
  typeDefs : [userTypeDefs, postsTypeDefs, followTypeDefs],
  resolvers : [userResolvers, postsResolvers, followResolvers],
  introspection : true
});

startStandaloneServer(server, {
  listen: { port: process.env.port ||3000  },
  context: ({req, res}) => {
    return {
        msg: "ini auth!!",
        auth: ()=> {
            const auth =  req.headers.authorization
            if(!auth) {
                throw new Error("unauthenticated")
            }
            const [type, access_token] = auth.split(" ")
            if(type !== "Bearer") {
                throw new Error ("Invalid Token")
            }
            const decoded = verifyToken(access_token)
            // console.log(decoded);
            return decoded
        }
    }
  }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
