const {gql}=require('apollo-server')

const typeDefs=gql `
    type User{
        id: ID!
        username: String
        email: String
        password: String
        createdAt: String
    }
    type Etat{
        id:ID!
        designation:String
        description:String
    }
    type Image{
        id:ID
        path:String
    }
    type Color{
        id:ID
        color:String
    }
    type sousSousCathegorie{
        id:ID
        designation:String
    }
    type sousCathegorie{
        id:ID
        designation:String
        sousSousCathegorie:[sousSousCathegorie]
    }

    type Cathegorie{
        id:ID
        designation:String
        sousCathegorie:[sousCathegorie]
    }

    type Article{
        id:ID!
        titre:String
        description:String
        marque:String
        etat:ID
        prix:String
        ISBN:String
        echange:String
        matiere:String
        createdAt: String
        color:[Color]
        image:[Image]
    }

    type Message{
        id:ID
        sender:ID
        receiver:ID
        article:ID
        message:String
        createdAt:String
    }

    type Query{
        getAllUsers :[User]
        getAllEtats:[Etat]
        getAllArticles:[Article]
        getAllCathegories:[Cathegorie]
        getUserById(id:ID):User
        getEtatById(id:ID):Etat
        getArticleById(id:ID):Article
        getCathegorieById(id:ID):Cathegorie
        getAllMessages:[Message]
        getAllMyMessages(sender:ID):[Message]
        getMyMessageAndOther(sender:ID,receiver:ID):[Message]
        getMyMessageByArticle(sender:ID,article:ID):[Message]
    }

    input UserInput{
        username: String
        email: String
        password:String
    }

    input EtatInput{
        designation:String
        description:String
    }
    input ImageInput{
        path:String
    }
    input ColorInput{
        path:String
    }

    input sousSousCathegoriesInput{
        designation:String
    }
    input sousCathegoriesInput{
        designation:String
        sousSousCathegorie:[sousSousCathegoriesInput]
    }

    input CathegorieInput{
        designation:String
        sousCathegorie:[sousCathegoriesInput]
    }

    input ArticleInput{
        titre:String
        description:String
        marque:String
        etat:String
        prix:String
        ISBN:String
        echange:String
        matiere:String
        color:[ColorInput]
        image:[ImageInput]
    }
    input MessageInput{
        sender:ID
        receiver:ID
        article:ID
        message:String
        createdAt:String
    }
    
    type Mutation{
        createUser(user:UserInput):User
        deleteUser(id:ID):String
        createEtat(etat:EtatInput):Etat
        deleteEtat(id:ID):String
        updateEtat(id:ID,etat:EtatInput):Etat
        createArticle(article:ArticleInput):Article
        deleteArticle(id:ID):String
        updateArticle(id:ID,article:ArticleInput):Article
        createCathegorie(cathegorie:CathegorieInput):Cathegorie
        deleteCathegorie(id:ID):String
        updateCathegorie(id:ID,cathegorie:CathegorieInput):Cathegorie
        createSousCathegorie(cathegorieId:ID,sousCathegorie:sousCathegoriesInput):Cathegorie
        deleteSousCathegorie(cathegorieId:ID,sousCathegorieId:ID):String
        updateSousCathegorie(cathegorieId:ID,sousCathegorieId:ID,sousCathegorie:sousCathegoriesInput):sousCathegorie
        createMessage(message:MessageInput):Message
        deleteMessage(id:ID):String
    }
`
module.exports=typeDefs;