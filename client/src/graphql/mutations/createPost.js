import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      createdAt
      likes {
        username
        createdAt
        id
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
