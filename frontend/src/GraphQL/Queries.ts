import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query Query {
    books {
      title
      author
      coverPhotoURL
      readingLevel
    }
  }
`;
