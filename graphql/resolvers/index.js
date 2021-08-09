const userResolver=require('./users');
const etatResolver=require('./etat');
const articleResolvers = require('./article');
const cathegorieResolvers=require('./cathegorie');

module.exports={
    Query: {
        ...userResolver.Query,
        ...etatResolver.Query,
        ...articleResolvers.Query,
        ...cathegorieResolvers.Query

    },
    Mutation :{
        ...userResolver.Mutation,
        ...etatResolver.Mutation,
        ...articleResolvers.Mutation,
        ...cathegorieResolvers.Mutation
    }
}