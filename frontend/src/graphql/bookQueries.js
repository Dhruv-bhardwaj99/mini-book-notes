import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      title
      author
      notes
      userId
    }
  }
`;