import gql from "graphql-tag";

export const GET_POST = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      username
      id
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        id
        body
      }
    }
  }
`;
