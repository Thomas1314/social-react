import gql from "graphql-tag";

export const GET_POSTS = gql`
  {
    getPosts {
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
