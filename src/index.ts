const express = require('express');
const ApolloServer = require('apollo-server');

const typeDefs=require('./graphql/typeDefs');
const resolvers=require('./graphql/resolvers/index');
const mongoose = require('mongoose');

require('dotenv/config')

const server=new ApolloServer.ApolloServer({
    cors: {
		origin: 'http://localhost:4200',			// <- allow request from all domains
		credentials: true},
    typeDefs,
    resolvers
});

process.on('SIGINT', () => { console.log("exiting…"); process.exit(); });

process.on('exit', () => { console.log("exiting…"); process.exit(); });

async function startServer(){
    await mongoose.connect(process.env.CONNECTION_DB,
        {useNewUrlParser:true,
         useUnifiedTopology: true },
        ).then(()=>console.log("connect to our database"))
        .catch(()=>console.log("connection failed"));
    
    server.listen({port:5000}).then(
        (res:any)=>{
            console.log(`Server running at ${res.url}`);
        }
    )
}

startServer();

