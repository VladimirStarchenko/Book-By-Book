import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        password
        savedBooks {
          bookId
          authors
          title
        }
        username
      }
    }
  }
`;
export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      bookCount
      email
      password
      savedBooks {
        title
        bookId
        authors
        description
        image
        link
      }
      username
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
      _id
      email
      bookCount
      savedBooks {
        title
        bookId
        authors
        description
        image
        link
      }
    }
  }
`;
