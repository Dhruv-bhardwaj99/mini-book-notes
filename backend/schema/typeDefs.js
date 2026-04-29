const typeDefs = `#graphql
type Book{
id: ID!
title: String!
author: String!
notes: String
}

type Query {
books: [Book!]!
}

type Mutation{
addBook(title: String!, author: String!, notes: String) : Book!
}`;

module.exports = typeDefs;
