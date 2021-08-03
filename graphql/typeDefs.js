const {gql}=require('apollo-server')

const typeDefs=gql `
    type User{
        id: ID
        username: String
        email: String
        password: String
        createdAt: String
    }
    type Query{
        hello: String
        getAllUsers :[User]
        getUserById(id:ID):User
    }

    input UserInput{
        username: String
        email: String
        password:String
    }
    
    type Mutation{
        createUser(user:UserInput):User
        deleteUser(id:ID):String
    }

`

module.exports=typeDefs;