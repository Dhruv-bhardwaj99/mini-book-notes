import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $notes: String) {
    addBook(title: $title, author: $author, notes: $notes) {
      _id
      title
      author
      notes
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      _id
      title
      author
      notes
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String!
    $author: String!
    $notes: String
  ) {
    updateBook(id: $id, title: $title, author: $author, notes: $notes) {
      _id
      title
      author
      notes
    }
  }
`;
