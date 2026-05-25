import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $notes: String) {
    addBook(title: $title, author: $author, notes: $notes) {
      id
      title
      author
      notes
    }
  }
`;