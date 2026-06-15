const typeDefs = `#graphql
type Book {
  _id: ID!
  title: String!
  author: String!
  notes: String
  userId: String!
}

type Query {
books: [Book!]!
}

type Mutation{
addBook(title: String!, author: String!, notes: String) : Book!
deleteBook(id: ID!): Book!
updateBook(id: ID!, title: String!, author: String!, notes: String) : Book!
}`;

module.exports = typeDefs;
