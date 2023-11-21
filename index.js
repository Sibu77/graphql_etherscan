const { ApolloServer } = require("apollo-server"); 
// Import ApolloServer from apollo-server

const { importSchema } = require("graphql-import");
// Import importSchema method from graphql-import

const EtherDataSource = require("./datasource/ethDatasource");
// Import EtherDataSource class 

const typeDefs = importSchema("./schema.graphql");
// Import GraphQL schemas

require("dotenv").config(); 
// Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => 
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Resolvers for GraphQL queries

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }), 
});

// Create Apollo Server instance

server.timeout = 0; 

server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Start Apollo Server on port 9000